import mongoose from "mongoose";
const solutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    shortDescription: String,
    image: String,
    requirements: [String],
    recommendedProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
    cleaningKit: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        recommendedQuantity: String,
      },
    ],
    benefits: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
solutionSchema.index({ isActive: 1 });
export default mongoose.model("Solution", solutionSchema);
