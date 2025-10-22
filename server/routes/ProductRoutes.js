import express from "express";
import auth from "../middlewares/auth.js";
import Product from "../models/ProductSchema.js";
import multer from "multer";
import adminOnly from "../middlewares/adminOnly.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config(); // .env dosyasını yükle

const router = express.Router();

// Multer config (geçici dosya için)
const storage = multer.diskStorage({});
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/", auth, adminOnly, upload.single("image"), async (req, res) => {
  console.log("👉 Body:", req.body);
  console.log("👉 File:", req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Dosya yüklenmedi" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary URL:", result.secure_url);

    const { name, price, stock, comment ,category,subcategory} = req.body;

    if (!name || !price || !stock || !comment || !category || !subcategory) {
      return res.status(400).json({ error: "Tüm alanlar zorunludur." });
    }

    const newProduct = new Product({
      name: name,
      price: Number(price),
      stock: Number(stock),
      comment,
      category,
      subcategory,
      imgUrl: result.secure_url,
      adminId: req.user.id, // admin kimliği ile ilişkilendir
      profileUrl: req.user.profileUrl,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Ürün başarıyla kaydedildi", product: newProduct });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ürün kaydı başarısız", detail: err.message });
  }
});



// Ürünleri listeleme
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", detail: err.message });
  }
});

// Product details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Geçersiz ürün ID" });
  }

  try {
    console.log("Product ID:", req.params.id);

    const product = await Product.findById(req.params.id)
  .populate("adminId", "store profileUrl");

    if (!product) return res.status(404).json({ message: "Ürün bulunamadı" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", detail: err.message });
  }
});

export default router;
