import Product from "../models/Product.js";
import Quote from "../models/Quote.js";
import Category from "../models/Category.js";
import Solution from "../models/Solution.js";

export function loginAdmin(req, res) {
  const providedKey = req.body?.apiKey;

  if (!providedKey || !process.env.ADMIN_API_KEY || providedKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ success: false, message: "Invalid admin key" });
  }

  return res.json({ success: true, message: "Admin key verified" });
}

export async function dashboard(req, res, next) {
  try {
    const [products, quotes, categories, solutions, pendingQuotes] =
      await Promise.all([
        Product.countDocuments({ isActive: true }),
        Quote.countDocuments(),
        Category.countDocuments({ isActive: true }),
        Solution.countDocuments({ isActive: true }),
        Quote.countDocuments({ status: "NEW" }),
      ]);
    res.json({
      success: true,
      data: { products, quotes, categories, solutions, pendingQuotes },
    });
  } catch (error) {
    next(error);
  }
}
