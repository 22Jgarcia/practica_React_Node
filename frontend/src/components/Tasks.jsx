// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useAuth } from "./store/useAuth.js";
import { Logout } from "./Logout.jsx";
import "../css/task.css";

function Tasks() {
  const { user, token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });
  const [editing, setEditing] = useState(null);

  const loadTasks = async () => {
    if (!token) return;
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    // Si no hay credenciales, forzar salida para volver a Login
    if (!token || !user) {
      logout?.();
      return;
    }

    const fetchTasks = async () => {
      if (!token) return; // No intentar si no hay token
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          alert("Sesión inválida o expirada. Inicia sesión nuevamente.");
          logout?.();
        }
      }
    };

    fetchTasks();
  }, [token, user, logout]);


  const createTask = async () => {
    if (!token) return alert("Debes iniciar sesión para crear tareas.");
    await api.post("/tasks", {
      title: form.title,
      description: form.description,
      status: form.status
    });

    setForm({ title: "", description: "", status: "pending" });
    loadTasks();
  };

  const updateTask = async () => {
    if (!token) return alert("Debes iniciar sesión para editar tareas.");
    await api.put(`/tasks/${editing.id}`, editing);
    setEditing(null);
    loadTasks();
  };

  const deleteTasks = async (id) => {
    if (!token) return alert("Debes iniciar sesión para eliminar tareas.");
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="tasks-page">
      <div className="tasks-card">
        <header className="tasks-header">
      <h2>Tareas de {user?.username}</h2>
        </header>
      </div>

      <div className="task-form">
        <input
          type="text"
          placeholder="titulo"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="descripcion"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pendiente</option>
          <option value="in_progress">En Progreso</option>
          <option value="done">Completada</option>
        </select>

        <button className="btn-primary" onClick={createTask}>Crear Tarea</button>
      </div>

      <ul className="tasks-list">
        {tasks.map((t) => (
          <li key={t.id} className={`tasks-item ${t.status}`}>
            <div className="task-info">
            <strong>{t.title}</strong>  
            <span>{t.description}</span>

            </div>

            <div className="tasks-action">
            <button onClick={() => deleteTasks(t.id)} className="btn-danger">Eliminar</button>
            <button onClick={() => setEditing(t)} className="btn-secondary">Editar</button>

            </div>
          </li>
        ))}
      </ul>

      {editing && (
        <div className="tasks-edit">
          <h3>Editar</h3>

          <input
            type="text"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          />

          <input
            type="text"
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
          />

          <select
            value={editing.status}
            onChange={(e) => setEditing({ ...editing, status: e.target.value })}
          >
            <option value="pending">Pendiente</option>
            <option value="in_progress">En Progreso</option>
            <option value="done">Completada</option>
          </select>
          <div className="edit-actions">
          <button onClick={updateTask} className="btn-primary">Guardar</button>
          <button onClick={() => setEditing(null)} className="btn-secondary">Cancelar</button>
          </div>
        </div>
      )}
      <Logout/>
    </div>
  );
}

export default Tasks;
