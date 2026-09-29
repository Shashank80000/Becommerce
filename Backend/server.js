import "dotenv/config";
import app from "./app.js";
import { connectDB, getDatabaseStatus } from "./config/db.js";

const port = process.env.PORT || 5000;

// Start the HTTP server even if MongoDB is unreachable. /health reports 503
// while the database is down and DB-backed routes surface errors through the
// error middleware, instead of the whole process crashing.
let dbOnline = false;

try {
  await connectDB();
  dbOnline = true;
} catch (error) {
  console.error("Startup continued without MongoDB. /health will report 503.", {
    code: error.code ?? null,
    message: error.message,
  });

  // Keep retrying in the background so a transient outage self-heals.
  const retry = setInterval(async () => {
    try {
      await connectDB({ attempts: 1 });
      dbOnline = true;
      clearInterval(retry);
      console.log("MongoDB reconnected. API fully operational.");
    } catch {
      // keep retrying
    }
  }, 15000);
  retry.unref();
}

app.locals.dbOnline = () => dbOnline;

app.listen(port, () =>
  console.log(`API listening on port ${port} (db: ${getDatabaseStatus().state})`),
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    console.log(`${signal} received, shutting down.`);
    process.exit(0);
  });
}
