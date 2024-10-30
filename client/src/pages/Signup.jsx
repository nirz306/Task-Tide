import React, { useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signup', {
        email,
        password,
        name,
      }, {
        withCredentials: true // Important for sending cookies
      });

      console.log("Response headers:", response.headers);
      
      if (response.status === 201) {
        console.log("Signup successful:", response.data.message); // Adjust based on server response
        localStorage.setItem("token", response.data.token); // Store the token
        localStorage.setItem("username", name); // Store the name

        // Navigate to the homepage and pass the username in state
        navigate('/', { state: { username: name } }); 
      } else {
        console.error("Unexpected response:", response.data);
        setErrorMessage("This user already exists or signup failed.");
      }
    } catch (err) {
      if (err.response) {
        console.error("Signup failed:", err.response.data.error);
        setErrorMessage(err.response.data.error || "An error occurred during signup.");
      } else if (err.request) {
        console.error("No response received from server:", err.request);
        setErrorMessage("No response from the server. Please try again.");
      } else {
        console.error("Error during signup:", err.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup} className="flex flex-col mt-10 w-[300px] mx-auto">
        <div>Name</div>
        <input
          className="mb-10 border p-2 "
          type="text"
          placeholder="eg:Ansh"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
         <div>Email</div>
        <input
          className="mb-10 border p-2"
          type="email"
          placeholder="eg:ansh21@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>Password</div>
        <input
          className="mb-10 border p-2"
          type="password"
          placeholder="ansh@2004"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      
        {errorMessage && (
          <div className="mt-5 text-red-500 text-center">
            {errorMessage}
          </div>
        )}


<div>
 Already have an account? <Link className="text-blue-900 hover:underline "to="/login">Login</Link>
</div>
        <button
          className="border mt-5 flex p-2 bg-rose-500 rounded-md mx-auto text-white font-semibold hover:shadow-xl  "
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
