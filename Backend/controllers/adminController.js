import jwt from "jsonwebtoken";
import Product from "../models/Product.js";
import Quote from "../models/Quote.js";
import Category from "../models/Category.js";
import Solution from "../models/Solution.js";
import { uploadProductImage } from "../utils/cloudinary.js";

export function loginAdmin(req, res) {
  const providedKey = req.body?.apiKey;

  if (!process.env.ADMIN_API_KEY || !process.env.JWT_SECRET) {
    return res.status(503).json({
      success: false,
      message: "Admin authentication is not configured on the server",
    });
  }

  if (!providedKey || providedKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ success: false, message: "Invalid admin key" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return res.json({ success: true, token, expiresIn: "2h" });
}

export async function uploadAdminProductImage(req, res, next) {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "An image file is required",
      });
    const result = await uploadProductImage(req.file.buffer);
    res.status(201).json({
      success: true,
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch (error) {
    next(error);
  }
}

export async function dashboard(req, res, next) {
  try {
    const [
      products,
      quotes,
      categories,
      solutions,
      pendingQuotes,
      quotesWithPdf,
      recentQuotes,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Quote.countDocuments(),
      Category.countDocuments({ isActive: true }),
      Solution.countDocuments({ isActive: true }),
      Quote.countDocuments({ status: "NEW" }),
      Quote.countDocuments({ attachment: { $exists: true } }),
      Quote.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);
    res.json({
      success: true,
      data: {
        products,
        quotes,
        categories,
        solutions,
        pendingQuotes,
        quotesWithPdf,
        recentQuotes,
      },
    });
  } catch (error) {
    next(error);
  }
}
