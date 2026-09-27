import Solution from "../models/Solution.js";
import { slugify } from "../utils/slugify.js";
export async function listSolutions(req, res, next) {
  try {
    res.json({
      success: true,
      data: await Solution.find({ isActive: true })
        .populate("recommendedProducts", "name slug images shortDescription")
        .sort({ name: 1 })
        .lean(),
    });
  } catch (error) {
    next(error);
  }
}
export async function getSolution(req, res, next) {
  try {
    const solution = await Solution.findOne({
      slug: req.params.slug,
      isActive: true,
    })
      .populate("recommendedProducts", "name slug images shortDescription")
      .populate("cleaningKit.product", "name slug")
      .lean();
    if (!solution)
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    res.json({ success: true, data: solution });
  } catch (error) {
    next(error);
  }
}
export async function adminListSolutions(req, res, next) {
  try {
    res.json({
      success: true,
      data: await Solution.find()
        .populate("recommendedProducts", "name slug")
        .lean(),
    });
  } catch (error) {
    next(error);
  }
}
export async function createSolution(req, res, next) {
  try {
    if (!req.body.name || !req.body.description)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: ["name and description are required"],
      });
    res.status(201).json({
      success: true,
      data: await Solution.create({
        ...req.body,
        slug: req.body.slug || slugify(req.body.name),
      }),
    });
  } catch (error) {
    next(error);
  }
}
export async function updateSolution(req, res, next) {
  try {
    const body = { ...req.body };
    if (body.name && !body.slug) body.slug = slugify(body.name);
    const solution = await Solution.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!solution)
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    res.json({ success: true, data: solution });
  } catch (error) {
    next(error);
  }
}
export async function deactivateSolution(req, res, next) {
  try {
    const solution = await Solution.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!solution)
      return res
        .status(404)
        .json({ success: false, message: "Solution not found" });
    res.json({ success: true, data: solution });
  } catch (error) {
    next(error);
  }
}
