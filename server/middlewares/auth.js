// middlewares/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"
    if (!token) return res.status(401).json({ error: "Token bulunamadı" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    console.log("Decoded JWT:", decoded);

    next();
  } catch (err) {
    if(err.name==="TokenExpiredError"){
      return res.status(401).json({error:"TokenSuresiDoldu"})
    }
    res.status(403).json({ error: "Geçersiz veya süresi dolmuş token" });
  } 
};

export default auth;
