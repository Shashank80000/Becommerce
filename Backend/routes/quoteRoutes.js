import { Router } from "express";
import { submitQuote, getQuote } from "../controllers/quoteController.js";
import { quoteRateLimit } from "../middleware/rateLimitMiddleware.js";
import { optionalPdf } from "../middleware/uploadMiddleware.js";
const router = Router();
router.post("/", quoteRateLimit, optionalPdf("attachment"), submitQuote);
router.get("/:quoteId", getQuote);
export default router;
