import { Router } from "express";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import {
  dashboard,
  loginAdmin,
  uploadAdminProductImage,
} from "../controllers/adminController.js";
import { productImageUpload } from "../middleware/uploadMiddleware.js";
import {
  adminListProducts,
  createProduct,
  updateProduct,
  deactivateProduct,
} from "../controllers/productController.js";
import {
  adminListCategories,
  createCategory,
  updateCategory,
  deactivateCategory,
} from "../controllers/categoryController.js";
import {
  adminListSolutions,
  createSolution,
  updateSolution,
  deactivateSolution,
} from "../controllers/solutionController.js";
import {
  adminListQuotes,
  updateQuoteStatus,
  downloadQuoteAttachment,
} from "../controllers/quoteController.js";
import { adminListContacts } from "../controllers/contactController.js";

const router = Router();
router.post("/login", loginAdmin);
router.use(requireAdmin);
router.get("/dashboard", dashboard);
router.post(
  "/uploads/product-image",
  productImageUpload,
  uploadAdminProductImage,
);
router.route("/products").get(adminListProducts).post(createProduct);
router.route("/products/:id").put(updateProduct).delete(deactivateProduct);
router.route("/categories").get(adminListCategories).post(createCategory);
router.route("/categories/:id").put(updateCategory).delete(deactivateCategory);
router.route("/solutions").get(adminListSolutions).post(createSolution);
router.route("/solutions/:id").put(updateSolution).delete(deactivateSolution);
router.get("/quotes", adminListQuotes);
router.patch("/quotes/:id/status", updateQuoteStatus);
router.get("/quotes/:id/attachment", downloadQuoteAttachment);
router.get("/contacts", adminListContacts);
export default router;
