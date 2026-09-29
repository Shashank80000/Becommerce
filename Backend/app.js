import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import solutionRoutes from "./routes/solutionRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { apiRateLimit } from "./middleware/rateLimitMiddleware.js";
import { notFound } from "./middleware/notFoundMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { getDatabaseStatus } from "./config/db.js";

const app = express();
const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);
if (process.env.NODE_ENV === "production" && configuredOrigins.length === 0) {
  throw new Error("CLIENT_URL must be configured in production");
}
const allowedOrigins = process.env.NODE_ENV === "production"
  ? configuredOrigins
  : [
      ...configuredOrigins,
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
    ];
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS"));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/api", apiRateLimit);
app.get("/health", (req, res) => {
  const database = getDatabaseStatus();

  return res.status(database.connected ? 200 : 503).json({
    success: true,
    data: {
      status: database.connected ? "ok" : "degraded",
      service: "becommerce-api",
      database,
    },
  });
});

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is working",
  });
});
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);
export default app;
