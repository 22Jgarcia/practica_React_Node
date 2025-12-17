import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) =>{
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split (' ')[1];

  if(!token) return res.status(401).json({ message: "token no provisto"});

  jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
    if(err) return res.status(403).json({ message: "token invalido"});
    req.user = user;
    next(); 
  });

}