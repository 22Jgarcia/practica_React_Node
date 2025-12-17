import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import { useAuth } from "./components/store/useAuth.js";
import { Register } from "./components/Register.jsx";



function App() {
  const { user } = useAuth();
 
  return(  
  <>
    <Router>
      <Routes>
        <Route path="/" element={ user ? <Tasks /> : <Login /> } />
        <Route path="/login" element={ !user ? <Login /> : <Tasks /> } />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </> 
  );
  
}

export default App;
