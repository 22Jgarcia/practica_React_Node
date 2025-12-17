import { useState } from "react";
import api from "../api/api.js";
import { useAuth } from "./store/useAuth.js";
import { Link } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginStore = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(username, password);
      const { data } = await api.post("/auth/login", { username, password });

      loginStore.login(data.user, data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Error de login");
    }
  };

  return (
    <div className="login" style={{ maxWidth: "280px", margin: "50px auto" }}>
      <div className="formlogin">
      <h2 className="namelogin">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />

          <input
            type="password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <button className="btnlogin" type="submit">Iniciar Sesión</button>
        </form>
      <Link  className="linkregister" to="/register">registrar</Link>
      </div>
      {/* <a href="/register">registrar</a> */}
    </div>
  );
};

export default Login;
