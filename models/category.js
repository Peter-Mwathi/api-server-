import mongoose from "mongoose";

const singlecategory = mongoose.Schema({
  category_id: Number,
  category: String,
});

export default mongoose.model("Category", singlecategory);
