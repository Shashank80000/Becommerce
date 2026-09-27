import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { slugify } from "../utils/slugify.js";

export async function listProducts(req, res, next) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 100);
    const filter = { isActive: true };
    if (req.query.search) filter.$text = { $search: req.query.search };
    if (req.query.category) {
      const category = await Category.findOne({
        slug: req.query.category,
        isActive: true,
      })
        .select("_id")
        .lean();
      if (!category)
        return res.json({
          success: true,
          data: [],
          pagination: { page, limit, total: 0, pages: 0 },
        });
      filter.category = category._id;
    }
    if (req.query.application)
      filter.applications = new RegExp(`^${req.query.application}$`, "i");
    if (req.query.packSize) filter.packSizes = req.query.packSize;
    if (req.query.featured === "true") filter.isFeatured = true;
    const sort = {
      popular: { isFeatured: -1, createdAt: -1 },
      name_asc: { name: 1 },
      name_desc: { name: -1 },
      newest: { createdAt: -1 },
    }[req.query.sort] || { isFeatured: -1, createdAt: -1 };
    const [data, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);
    res.json({
      success: true,
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
}
export async function getProduct(req, res, next) {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    })
      .populate("category", "name slug")
      .lean();
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}
export async function adminListProducts(req, res, next) {
  try {
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}
export async function createProduct(req, res, next) {
  try {
    const body = req.body;
    if (
      !body.name ||
      !body.category ||
      !body.description ||
      !Array.isArray(body.packSizes) ||
      !body.packSizes.length ||
      !Array.isArray(body.applications)
    )
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: [
          "name, category, description, packSizes, and applications are required",
        ],
      });
    const category = await Category.findOne({
      $or: [{ _id: body.category }, { slug: body.category }],
      isActive: true,
    });
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Category not found" });
    const product = await Product.create({
      ...body,
      slug: body.slug || slugify(body.name),
      category: category._id,
    });
    res.status(201).json({
      success: true,
      data: await product.populate("category", "name slug"),
    });
  } catch (error) {
    next(error);
  }
}
export async function updateProduct(req, res, next) {
  try {
    const body = { ...req.body };
    if (body.name && !body.slug) body.slug = slugify(body.name);
    if (body.category) {
      const category = await Category.findOne({
        $or: [{ _id: body.category }, { slug: body.category }],
      });
      if (!category)
        return res
          .status(400)
          .json({ success: false, message: "Category not found" });
      body.category = category._id;
    }
    const product = await Product.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}
export async function deactivateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}
