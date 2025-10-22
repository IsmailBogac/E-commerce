// middlewares/adminOnly.js
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Yetkiniz yok" });
  }
  next();
};

export default adminOnly;
