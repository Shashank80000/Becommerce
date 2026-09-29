import "dotenv/config";
import dns from "node:dns"; // or use "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;
try {
  await connectDB();
  app.listen(port, () =>
    console.log(`API listening on port ${port}`),
  );
} catch (error) {
  console.error(`Startup failed: ${error.message}`);
  process.exit(1);
}
