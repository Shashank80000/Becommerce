import mongoose from "mongoose";
const imageSchema = new mongoose.Schema(
  { url: { type: String, required: true }, publicId: String },
  { _id: false },
);
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    shortDescription: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    images: [imageSchema],
    applications: [{ type: String, index: true }],
    packSizes: { type: [String], required: true },
    features: [String],
    specifications: mongoose.Schema.Types.Mixed,
    usageInstructions: String,
    safetyInformation: String,
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
productSchema.index({
  name: "text",
  description: "text",
  shortDescription: "text",
});
productSchema.index({ isActive: 1, createdAt: -1 });
productSchema.index({ applications: 1, isActive: 1 });
export default mongoose.model("Product", productSchema);
