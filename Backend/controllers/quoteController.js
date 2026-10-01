import mongoose from "mongoose";
import Quote from "../models/Quote.js";
import { createQuote } from "../services/quoteService.js";
import { openAttachment } from "../utils/attachmentStorage.js";

const required = ["name", "companyName", "phone", "product", "deliveryLocation"];
const STATUSES = ["NEW", "CONTACTED", "QUOTED", "CLOSED"];
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function submitQuote(req, res, next) {
  try {
    const missing = required.filter(
      (field) => typeof req.body[field] !== "string" || !req.body[field].trim(),
    );
    if (missing.length)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: missing.map((field) => `${field} is required`),
      });
    const quote = await createQuote(req.body, req.file);
    res.status(201).json({
      success: true,
      message: "Quote request submitted successfully",
      data: {
        quoteId: quote.quoteId,
        status: quote.status,
        attachment: quote.attachment
          ? { filename: quote.attachment.filename, size: quote.attachment.size }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Public: lets a customer check progress by quote ID. Contact details are
// deliberately left out so an ID alone never reveals someone's data.
export async function getQuote(req, res, next) {
  try {
    const quote = await Quote.findOne({ quoteId: req.params.quoteId })
      .select("quoteId productName status createdAt -_id")
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
    const status = typeof req.query.status === "string" ? req.query.status.toUpperCase() : "";
    if (STATUSES.includes(status)) filter.status = status;
    if (typeof req.query.search === "string" && req.query.search.trim()) {
      const pattern = new RegExp(escapeRegex(req.query.search.trim()), "i");
      filter.$or = [
        { companyName: pattern },
        { name: pattern },
        { quoteId: pattern },
        { productName: pattern },
      ];
    }
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
    const status =
      typeof req.body.status === "string" ? req.body.status.toUpperCase() : "";
    if (!STATUSES.includes(status))
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

export async function downloadQuoteAttachment(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ success: false, message: "Invalid resource identifier" });
    const quote = await Quote.findById(req.params.id).select("attachment").lean();
    if (!quote?.attachment)
      return res
        .status(404)
        .json({ success: false, message: "This quote has no attachment" });

    const { fileId, filename, size } = quote.attachment;
    const stream = openAttachment(fileId);
    stream.once("error", (error) => {
      if (res.headersSent) return res.destroy(error);
      res.status(404).json({ success: false, message: "Attachment file is missing" });
    });
    stream.once("file", () => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": size,
        "Content-Disposition": `${req.query.inline === "1" ? "inline" : "attachment"}; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      });
    });
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
}
