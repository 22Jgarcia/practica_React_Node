import sql from "mssql";
import { poolConnect, pool } from "../config/db.js";

export const getTasks = async (req, res) =>{
  // const { user_id} = req.params;
  const user_id = req.user.id;
  console.log("User ID from token:", user_id);
  await poolConnect;

  try{
    const result = await pool.request()
    .input("user_id", sql.Int, user_id)
    .query(`select * from task where user_id = @user_id`);

    res.json(result.recordset);

  }catch(err){
    res.status(500).json({ error: err.message});
  };
}

export const createTask =async(req, res) =>{
  const user_id = req.user.id;
  const { title, description, status} = req.body;
  await poolConnect;

  try{
    const result = await pool.request()
    .input("user_id", sql.Int, user_id)
    .input("title", sql.NVarChar, title)
    .input("description", sql.NVarChar, description)
    .input("status", sql.NVarChar, status)
    .query(`
      insert into task 
      (user_id, title, description, status) 
      values 
      (@user_id, @title, @description, @status)`
    );

    res.json(result.recordset);
    
  }catch(err){
    res.status(500).json({ error: err.message});

  }
}


export const updateTask = async (req, res) =>{
  // const user_id = req.user.id;
  const {id} = req.params;
  const { title, description, status} = req.body;

  await poolConnect;

  const checkOwnerQuery = `SELECT user_id FROM task WHERE id = @id`;

  const ownerRes = await pool.request()
  .input("id", sql.Int, id)
  .query(checkOwnerQuery);

  if(ownerRes.recordset.length === 0){
    return  res.status(404).json({ message: "tarea no encontrada"});
  }

  if (ownerRes.recordset[0].user_id !== req.user.id){
    return res.status(403).json({ message: "No autorizado para actualizar esta tarea"});

  } 
  try{
      await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("description", sql.NVarChar, description)
      .input("status", sql.NVarChar, status)
      .query(`
        update task set 
          title = @title, 
          description = @description, 
          status = @status where id = @id
      `);
      res.json({message: "tarea actualizada correctamente"});
  }catch(err){
    res.status(500).json({ error: err.message});
  }

}

export const deleteTask = async (req, res) =>{
  const {id} = req.params;
  const user_id = req.user.id; 

  await poolConnect;

  const checkOwnerQuery = `SELECT user_id FROM task WHERE id = @id`;

  const ownerRes = await pool.request()
  .input("id", sql.Int, id)
  .query(checkOwnerQuery);

  if(ownerRes.recordset.length === 0){
    return  res.status(404).json({ message: "tarea no encontrada"});
  }
  if (ownerRes.recordset[0].user_id !== user_id){
    return res.status(403).json({ message: "No autorizado para eliminar esta tarea"});
  }

  try{
    await pool.request()
    .input("id", sql.Int, id)
    .query(`delete from task where id = @id`);

    res.json({message: "tarea eliminada correctamente"});

  }catch(err){
    res.status(500).json({ error: err.message});
  }
}