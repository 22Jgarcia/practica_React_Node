import sql from "mssql";
import { poolConnect, pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res)=>{
  const { username, password} = req.body;
  if(!username || !password) return res.status(400).json({ message: "Faltan campos requeridos"});
  // console.log(username, password);

  await poolConnect;
  try{
    const exists = await pool.request()
    .input("username",sql.NVarChar, username)
    .query("select * from users where username = @username");
    if(exists.recordset.length > 0){
      return res.status(400).json({ message: "El nombre de usuario ya existe"});
    }

    const hash = await bcrypt.hash(password, 10);
    // console.log("hash " + hash);

    const insert = await pool.request()
    .input("username", sql.NVarChar, username)
    .input("password_hash", sql.NVarChar, hash)
    .query(`INSERT INTO users 
            (username, password_hash)
             VALUES 
             (@username, @password_hash); 
             select SCOPE_IDENTITY() AS id;
    `);

    const user_id = insert.recordset?.[0]?.id ?? null;

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {id: user_id, username}
    });

  }catch(err){
    res.status(500).json({ error: err.message});
  }

};

export const login = async (req, res) =>{
  const { username, password} = req.body;
  if(!username || !password) return res.status(400).json({ message: "Faltan campos requeridos"});
  // const plain = "123456";
  // const hash = bcrypt.hashSync(plain, 10);
  // console.log(hash);
  // console.log(username, password);

  await poolConnect;
  
  try{
    const result = await pool.request()
      .input("username", sql.NVarChar, username)
      .query("select * from users where username = @username");

      if(result.recordset.length === 0){
        return res.status(400).json({message: "usuario no encontrado"});

      };

      const user = result.recordset[0];
      // const isValid = password === user.password_hash;

      // if(!isValid){
      //   return res.status(400).json({message: "contraseña incorrecta"});
      // }
      const isValid = await bcrypt.compare(password, user.password_hash);
      // console.log("Password valid: " + isValid);
      if(!isValid){
        return res.status(400).json({message: "contraseña incorrecta"});
      }
      const payload = {id: user.id, username: user.username};
      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
      // if(user.password !== password){
      //   return res.status(400).json({message: "contraseña incorrecta"});
      // }
   
      return res.json({
        message:" Login exitoso",
        token,
        user:{id: user.id, username: user.username}
      });
      // return res.json({
      //   message: "login exitoso",
      //   user:{id: user.id, username: user.username}
      // });

  }catch(err){
    res.status(500).json({ error: err.message});
  }
};