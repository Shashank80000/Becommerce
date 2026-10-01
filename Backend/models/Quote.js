import mongoose from "mongoose";
const attachmentSchema = new mongoose.Schema(
  {
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, default: "application/pdf" },
  },
  { _id: false },
);
const quoteSchema = new mongoose.Schema(
  {
    quoteId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    companyName: { type: String, required: true, trim: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160 },
    // productName is what the customer picked; product links the catalogue
    // record when one matches.
    productName: { type: String, required: true, trim: true, maxlength: 160 },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    deliveryLocation: { type: String, required: true, trim: true, maxlength: 200 },
    businessType: { type: String, trim: true, maxlength: 80 },
    message: { type: String, trim: true, maxlength: 5000 },
    attachment: attachmentSchema,
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "QUOTED", "CLOSED"],
      default: "NEW",
      index: true,
    },
  },
  { timestamps: true },
);
quoteSchema.index({ createdAt: -1 });
quoteSchema.index({ companyName: 1, phone: 1 });
export default mongoose.model("Quote", quoteSchema);
