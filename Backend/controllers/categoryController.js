import Category from "../models/Category.js";
import Product from "../models/Product.js";
import { slugify } from "../utils/slugify.js";
export async function listCategories(req, res, next) {
  try {
    res.json({
      success: true,
      data: await Category.find({ isActive: true }).sort({ name: 1 }).lean(),
    });
  } catch (error) {
    next(error);
  }
}
export async function getCategory(req, res, next) {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    }).lean();
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    const products = await Product.find({
      category: category._id,
      isActive: true,
    }).lean();
    res.json({ success: true, data: { category, products } });
  } catch (error) {
    next(error);
  }
}
export async function adminListCategories(req, res, next) {
  try {
    res.json({
      success: true,
      data: await Category.find().sort({ name: 1 }).lean(),
    });
  } catch (error) {
    next(error);
  }
}
export async function createCategory(req, res, next) {
  try {
    if (!req.body.name)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: ["name is required"],
      });
    const category = await Category.create({
      ...req.body,
      slug: req.body.slug || slugify(req.body.name),
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
}
export async function updateCategory(req, res, next) {
  try {
    const body = { ...req.body };
    if (body.name && !body.slug) body.slug = slugify(body.name);
    const category = await Category.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
}
export async function deactivateCategory(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
}
