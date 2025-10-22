import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AdminRoutes from "./routes/AdminRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected 🚀"))
  .catch((err) => console.error(err));

app.use("/api/admin", AdminRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/user/me", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/cart", CartRoutes);

app.listen(8080, () => console.log("Server running on port 8080 🚀"));
