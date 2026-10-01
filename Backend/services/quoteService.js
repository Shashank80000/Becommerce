import mongoose from "mongoose";
import Quote from "../models/Quote.js";
import Product from "../models/Product.js";
import { generateQuoteId } from "../utils/generateQuoteId.js";
import { saveAttachment, deleteAttachment } from "../utils/attachmentStorage.js";

// Multipart form posts send line breaks as \r\n; store plain \n.
const text = (value) =>
  typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : undefined;

async function findProduct({ product, productSlug }) {
  const or = [];
  if (mongoose.isValidObjectId(product)) or.push({ _id: product });
  if (text(productSlug)) or.push({ slug: text(productSlug) });
  if (text(product)) or.push({ name: text(product) });
  if (!or.length) return null;
  return Product.findOne({ $or: or, isActive: true }).select("_id name").lean();
}

export async function createQuote(body, file) {
  const product = await findProduct(body);
  const attachment = file
    ? await saveAttachment(file, { uploadedBy: text(body.companyName) })
    : undefined;

  try {
    // Only copy fields a customer may set; status, quoteId, timestamps and
    // the attachment record are decided by the server.
    const quote = await Quote.create({
      quoteId: generateQuoteId(),
      name: text(body.name),
      companyName: text(body.companyName),
      phone: text(body.phone),
      email: text(body.email) || undefined,
      productName: product?.name || text(body.product),
      product: product?._id,
      deliveryLocation: text(body.deliveryLocation),
      businessType: text(body.businessType),
      message: text(body.message),
      attachment,
    });
    return quote;
  } catch (error) {
    if (attachment) await deleteAttachment(attachment.fileId);
    throw error;
  }
}
