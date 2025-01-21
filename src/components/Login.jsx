import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login/", formData);

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        const { access_token } = response.data;
        localStorage.setItem("authToken", access_token);
        navigate("/dashboard"); // Redirect to the login page
        // Handle successful login (e.g., store token, redirect, etc.)
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex items-center justify-center">
        <div className="flex flex-col bg-slate-300 p-16 rounded-md w-96 h-96">
          <h1 className="text-3xl text-center font-bold">Login</h1>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <button
            className="bg-slate-400 p-2 rounded-md font-medium"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
