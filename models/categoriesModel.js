import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
let Dataset = mongoose.models.categories || mongoose.model("categories", categoriesSchema);
export default Dataset;
