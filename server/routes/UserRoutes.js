import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserSchema.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// User kayıt

router.post("/", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı" });
    }

    // şifreyi hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // yeni kullanıcıyı oluştur

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
    });

    await newUser.save();
    res.status(201).json({ message: "Kullanıcı kaydedildi 🚀", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kullanıcı kaydı başarısız", detail: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "Kullanıcı bulunamadı" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Geçersiz şifre" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Giriş başaraılı 🚀", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    // req.user.id ile DB'den admin bilgilerini çek
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });

    res.status(200).json({
      success: true,
      message: "Kullanıcı bilgisi alındı",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
