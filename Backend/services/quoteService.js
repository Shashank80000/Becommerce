import Quote from "../models/Quote.js";
import Product from "../models/Product.js";
import { generateQuoteId } from "../utils/generateQuoteId.js";

export async function createQuote(payload) {
  const product = await Product.findOne({
    _id: payload.product,
    isActive: true,
  }).lean();
  if (!product) {
    const error = new Error("Product not found or inactive");
    error.statusCode = 400;
    throw error;
  }
  const quote = await Quote.create({
    ...payload,
    quoteId: await generateQuoteId(),
    product: product._id,
  });
  return quote.populate("product", "name slug");
}
