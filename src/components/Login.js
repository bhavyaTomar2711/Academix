import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Ensure Firebase is properly configured
import { collection, query, where, getDocs } from "firebase/firestore";
import "./L.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const usersRef = collection(db, "users"); // Reference to users collection
      const q = query(usersRef, where("username", "==", username), where("password", "==", password));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
  
        // ✅ Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
  
        navigate("/Dashboard"); // Redirect to classroom after login
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  

  return (
    <div className="login-container">
      {/* Background Images from Public Folder */}
      <div className="box">
        <img src="/testimonials-background.jpg" alt="Background" className="bg" />
        <img src="/testimonials-2-men-talking.svg" alt="Illustration" className="bg2" />
      </div>

     
      <img src="/academix1.png" alt="Academix Logo" className="logo" />

      {/* Headings */}
      <h20>Login</h20>
      <h21>Glad you are back!</h21>
      <h23>Don't have an account?</h23>
      <button type="button" className="signupB" onClick={() => alert("Signup is not available")}>
        Signup
      </button>

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          className="box" 
          id="Username" 
          name="Username" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required 
        />

        <input 
          type="password" 
          className="box" 
          id="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
        />

        <button type="submit" id="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
