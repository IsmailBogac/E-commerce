import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  comment: String,
  category: String,
  subcategory: String,
  imgUrl: String,
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // ✅ burası çok kritik
    required: true,
  },
},{timestamps:true});

export default mongoose.model("Product", productSchema);
