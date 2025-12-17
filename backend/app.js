import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

dotenv.config();

 const app = express();

app.use(cors());
app.use(express.json());

db.poolConnect.then(() => {
  console.log("Database connected");
}).catch(err =>{
  console.error("error al conectar a la base de datos", err);
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT, () =>{
  console.log(`Server running on port ${process.env.PORT}`);
})

