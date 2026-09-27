import Quote from "../models/Quote.js";
import { createQuote } from "../services/quoteService.js";
const required = [
  "name",
  "companyName",
  "phone",
  "product",
  "quantity",
  "unit",
  "deliveryLocation",
];
export async function submitQuote(req, res, next) {
  try {
    const missing = required.filter(
      (field) => req.body[field] === undefined || req.body[field] === "",
    );
    if (missing.length || Number(req.body.quantity) <= 0)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: [
          ...missing.map((field) => `${field} is required`),
          ...(Number(req.body.quantity) <= 0
            ? ["quantity must be greater than zero"]
            : []),
        ],
      });
    const quote = await createQuote({
      ...req.body,
      quantity: Number(req.body.quantity),
    });
    res.status(201).json({
      success: true,
      message: "Quote request submitted successfully",
      data: { quoteId: quote.quoteId, quote },
    });
  } catch (error) {
    next(error);
  }
}
export async function getQuote(req, res, next) {
  try {
    const quote = await Quote.findOne({ quoteId: req.params.quoteId })
      .populate("product", "name slug")
      .lean();
    if (!quote)
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    res.json({ success: true, data: quote });
  } catch (error) {
    next(error);
  }
}
export async function adminListQuotes(req, res, next) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const filter = {};
    if (req.query.status) filter.status = req.query.status.toUpperCase();
    if (req.query.search)
      filter.$or = [
        { companyName: new RegExp(req.query.search, "i") },
        { name: new RegExp(req.query.search, "i") },
        { quoteId: new RegExp(req.query.search, "i") },
      ];
    const [data, total] = await Promise.all([
      Quote.find(filter)
        .populate("product", "name slug")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Quote.countDocuments(filter),
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
export async function updateQuoteStatus(req, res, next) {
  try {
    const status = req.body.status?.toUpperCase();
    if (!["NEW", "CONTACTED", "QUOTED", "CLOSED"].includes(status))
      return res
        .status(400)
        .json({ success: false, message: "Invalid quote status" });
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    ).populate("product", "name slug");
    if (!quote)
      return res
        .status(404)
        .json({ success: false, message: "Quote not found" });
    res.json({ success: true, data: quote });
  } catch (error) {
    next(error);
  }
}
