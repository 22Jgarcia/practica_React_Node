import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controller/task.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authenticateToken);
// Montado en /tasks en app.js, así que aquí usamos la raíz
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;