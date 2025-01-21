import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    contact_no: "",
    first_name: "",
    last_name: "",
    room_no: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/user/register", formData);
      
      //Redirecting to login page
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        navigate("/login"); // Redirect to the login page
      }
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex items-center justify-center">
        <div className="flex flex-col bg-slate-300 p-16 rounded-md w-96">
          <h1 className="text-3xl text-center font-bold">Register</h1>
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
          <input
            type="text"
            name="contact_no"
            placeholder="Contact Number"
            className="p-2"
            value={formData.contact_no}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="p-2"
            value={formData.first_name}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="p-2"
            value={formData.last_name}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="room_no"
            placeholder="Room Number"
            className="p-2"
            value={formData.room_no}
            onChange={handleChange}
          />
          <br />
          <button className="bg-slate-400 p-2 rounded-md font-medium" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
