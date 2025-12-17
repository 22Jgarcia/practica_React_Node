import { useAuth } from "./store/useAuth";




export const Logout = () => {

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button style={{margin:"15px", padding:"10px", borderRadius:"8px", backgroundColor:"#4884e4ff", color:"white", border:"none", cursor:"pointer", transition:"border-color 0.3s, box-shadow 0.3s"}} onClick={handleLogout}>Cerrar sesión</button>
      <a href="/login"></a>
    </div>
  );
}



