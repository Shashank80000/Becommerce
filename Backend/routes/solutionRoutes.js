import { Router } from "express";
import {
  listSolutions,
  getSolution,
} from "../controllers/solutionController.js";
const router = Router();
router.get("/", listSolutions);
router.get("/:slug", getSolution);
export default router;
