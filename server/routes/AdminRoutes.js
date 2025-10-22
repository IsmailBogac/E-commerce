import express from "express";
import auth from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import Admin from "../models/AdminSchema.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import ProductSchema from "../models/ProductSchema.js";

const router = express.Router();

// Admin kayıt

// Multer config (geçici dosya için)
const storage = multer.diskStorage({});
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/", upload.single("profileUrl"), async (req, res) => {
  console.log("👉 Body:", req.body);
  console.log("👉 File:", req.file);

  try {
    if (!req.file) {
      return req.status(400).json({ error: "Profil dosyası yüklenemedi" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary URL:", result.secure_url);

    const { name, email, password, store } = req.body;

    // şifreyi hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // yeni kullanıcıyı oluştur
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      store,
      profileUrl: result.secure_url,
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin kaydedildi 🚀", admin: newAdmin });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Admin Kaydı başarısız", detail: err.message });
  }
});

// Admin login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ error: "Admin bulunamadı" });

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) return res.status(400).json({ error: "Geçersiz şifre" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin", name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Giriş başarılı 🚀", token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    // req.user.id ile DB'den admin bilgilerini çek
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ error: "Admin bulunamadı" });

    // Adminin ürünlerini çek
    const products = await ProductSchema.find({ adminId: admin._id });

    res.json({
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      store: admin.store,
      profileUrl: admin.profileUrl,
      products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
