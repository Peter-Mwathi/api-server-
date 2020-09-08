import mongoose from "mongoose";

const singleProduct = mongoose.Schema({
  server_id: String,
  title: String,
  currency: String,
  image: String,
  description: String,
  old_price: String,
  current_price: String,
  rating: String,
  reviews: String,
  category: String,
  product_id: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Products", singleProduct);
