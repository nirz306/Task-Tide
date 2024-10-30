import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password,
      },{
        withCredentials: true
      });
  
   // After a successful login
if (response.data.token) {
  localStorage.setItem('token', response.data.token); // Store token
  localStorage.setItem('username', response.data.user.name); // Store username
  navigate('/'); // Redirect to the home page or dashboard
}
  
    } catch (err) {
      console.error('Login failed:', err.response?.data?.error || err.message);
    }
  };
  

  return (
    <div>
 
      <form onSubmit={handleLogin} className="flex flex-col mt-10  w-[300px] mx-auto">
      <div>Email</div>
        <input
           className="mb-10 border p-2 "
          type="email"
           placeholder="eg:ansh21@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
          <div>Password</div>
        <input
           className="mb-10 border p-2 "
          type="password"
        placeholder="ansh@2004"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

<div>
  Don't have an account? <Link className="text-blue-900 hover:underline "to="/signup">Sign Up</Link>
</div>
        <button
           className="border mt-5 flex p-2 bg-rose-500 rounded-md mx-auto text-white font-semibold hover:shadow-xl  "
          type="submit"
        >
          Login
        </button>
      </form>

      {/* Conditionally render the error message if it exists */}
      {errorMessage && (
        <div className="mt-5 text-red-500 text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Login;
