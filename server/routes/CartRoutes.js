import express from "express";
import Cart from "../models/CartSchema.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Sepete ürün ekleme
router.post("/add", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Token'dan alınacak

  try {
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
    } else {
      await Cart.create({ userId, productId, quantity: quantity || 1 });
    }

    res.json({ message: "Ürün sepete eklendi" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Sepete eklenirken hata oluştu", error: err.message });
  }
});

// Kullanıcının sepetini getir
router.get("/", auth, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id })
      .populate("productId", "name price imgUrl") // Ürün bilgilerini alıyoruz
      .populate("userId", "name email");

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Sepet alınamadı", detail: err.message });
  }
});

router.put("/increase/:id", auth, async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: "Ürün bulunamadı" });

    cartItem.quantity += 1;
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/decrease/:id", auth, async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: "Ürün bulunamadı" });

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      res.json(cartItem);
    } else {
      await cartItem.deleteOne();
      res.json({ message: "Ürün sepetten silindi" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
