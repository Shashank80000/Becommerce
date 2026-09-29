import mongoose from "mongoose";
import dns from "node:dns";

// Node's c-ares resolver reads the OS resolver list. On this machine that list
// is ["127.0.0.1"], but nothing is listening on 127.0.0.1:53 (stale local DNS
// proxy / VPN filter), so every SRV lookup fails with ECONNREFUSED. `nslookup`
// still succeeds because it queries the router resolver directly, which is why
// the failure looks impossible to reproduce outside Node.
const FALLBACK_DNS = ["1.1.1.1", "8.8.8.8"];

function srvRecordName(uri) {
  if (!uri.startsWith("mongodb+srv://")) return null;
  // Strip the scheme and any "user:pass@" prefix, then the path/query.
  const afterScheme = uri.slice("mongodb+srv://".length);
  const afterCreds = afterScheme.slice(afterScheme.lastIndexOf("@") + 1);
  const host = afterCreds.split("/")[0].split("?")[0];
  return host ? `_mongodb._tcp.${host}` : null;
}

// Resolves the SRV record, falling back to public resolvers when the configured
// one is unreachable. Only relevant for mongodb+srv:// URIs; a standard
// mongodb:// URI with an explicit host needs no SRV lookup at all.
export async function ensureDnsResolution(uri) {
  const probe = srvRecordName(uri);
  if (!probe) return;

  try {
    await dns.promises.resolveSrv(probe);
    return;
  } catch (error) {
    console.warn(`[db] SRV lookup failed via configured resolver (${error.code}). Trying fallback DNS.`);
  }

  // Try the fallback resolvers together, then individually in case one is filtered.
  for (const servers of [FALLBACK_DNS, ["1.1.1.1"], ["8.8.8.8"]]) {
    dns.setServers(servers);
    try {
      await dns.promises.resolveSrv(probe);
      console.log(`[db] DNS fallback active (resolver: ${servers.join(", ")}).`);
      return;
    } catch {
      // try the next resolver set
    }
  }

  throw new Error(
    "Could not resolve the MongoDB SRV record with any DNS server. Check your DNS, VPN, or antivirus configuration.",
  );
}

export function getDatabaseStatus() {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const { readyState, host, name } = mongoose.connection;

  return {
    connected: readyState === 1,
    state: states[readyState] || "unknown",
    ...(host ? { host } : {}),
    ...(name ? { database: name } : {}),
  };
}

export async function connectDB({ attempts = 5, delayMs = 5000 } = {}) {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI is not configured");

  mongoose.connection.on("error", (error) => {
    console.error("[db] connection error", { code: error.code, message: error.message });
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("[db] disconnected from MongoDB");
  });

  const options = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    maxPoolSize: 20,
    minPoolSize: 0,
    maxIdleTimeMS: 300000,
    retryWrites: true,
  };

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await ensureDnsResolution(mongoUri);
      await mongoose.connect(mongoUri, options);
      console.log(`MongoDB connected: ${mongoose.connection.host} db=${mongoose.connection.name}`);
      return;
    } catch (error) {
      console.error(`MongoDB connection failed (attempt ${attempt}/${attempts})`, {
        code: error.code ?? null,
        message: error.message,
      });
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
