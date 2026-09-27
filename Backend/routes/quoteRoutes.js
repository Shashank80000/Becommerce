import { Router } from "express";
import { submitQuote, getQuote } from "../controllers/quoteController.js";
import { quoteRateLimit } from "../middleware/rateLimitMiddleware.js";
const router = Router();
router.post("/", quoteRateLimit, submitQuote);
router.get("/:quoteId", getQuote);
export default router;
