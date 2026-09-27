import mongoose from "mongoose";
const quoteSchema = new mongoose.Schema(
  {
    quoteId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    unit: { type: String, required: true, trim: true },
    deliveryLocation: { type: String, required: true, trim: true },
    businessType: String,
    message: String,
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
