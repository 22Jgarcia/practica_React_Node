import { useState } from "react";
import api from "../api/api";
import { useAuth } from "./store/useAuth.js";
import { Link } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const registerStore = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", { username, password });
      registerStore.register(data.user, data.token);
      alert("Registration successful:", data);
    
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
      
    }
  };

  return (
    <div style={{ maxWidth: "280px", margin: "50px auto" }}>
      <h2>Registrar usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </div>
      </form>
      {/* <a href="/login">Iniciar sesión</a> */}
      <Link to="/login">Iniciar sesión</Link>
    </div>
  );
};
