import React, { useState, useEffect } from "react";
import userIcon from "../assests/user.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [name, setName] = useState(""); // Default name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (location.state && location.state.username) {
      setName(location.state.username); // Update name from signup
      setIsLoggedIn(true);
      localStorage.setItem("username", location.state.username); // Store the new username
    } else if (token) {
      setIsLoggedIn(true);
      setName(storedUsername); // Update name based on existing login
    } else {
      setIsLoggedIn(false);
      setName("");
    }
  }, [location.state]); // Dependency array to update when location state changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setName(""); // Reset to default after logout
    navigate("/login");
  };

  return (
    <div className="outer flex-row">
      <div className="inner1 flex items-center p-4 md:space-x-[400px] w-max max-md:space-x-[200px]">
        <h1 className="text-2xl font-extrabold text-rose-500 font-sans">
          Task Tide
        </h1>
        <div className="links flex space-x-6">
          <Link to="/" className="relative group">
            <span className="absolute inset-0 transition-transform transform scale-0 bg-rose-500 rounded-lg group-hover:scale-125"></span>
            <span className="relative z-10 transition-colors group-hover:text-white font-semibold">
              Home
            </span>
          </Link>
          <Link to="/create" className="relative group">
            <span className="absolute inset-0 transition-transform transform scale-0 bg-rose-500 rounded-lg group-hover:scale-125"></span>
            <span className="relative z-10 transition-colors group-hover:text-white font-semibold">
              New Task
            </span>
          </Link>

          {isLoggedIn ? (
            <Link to="/login" onClick={handleLogout} className="relative group">
              <span className="absolute inset-0 transition-transform transform scale-0 bg-rose-500 rounded-lg group-hover:scale-125"></span>
              <span className="relative z-10 transition-colors group-hover:text-white font-semibold">
                Logout
              </span>
            </Link>
          ) : (
            <Link to="/login" className="relative group">
              <span className="absolute inset-0 transition-transform transform scale-0 bg-rose-500 rounded-lg group-hover:scale-125"></span>
              <span className="relative z-10 transition-colors group-hover:text-white font-semibold">
                Login
              </span>
            </Link>
          )}

          {!isLoggedIn ? (
            <Link to="/signup" className="relative group">
              <span className="absolute inset-0 transition-transform transform scale-0 bg-rose-500 rounded-lg group-hover:scale-125"></span>
              <span className="relative z-10 transition-colors group-hover:text-white font-semibold">
                Sign up
              </span>
            </Link>
          ) : null}

          <div className="inner2 flex-col items-center">
            <img
              className="w-4 items-center mx-auto"
              src={userIcon}
              alt="User icon"
            />
            
            <div className="text-xs font-sans">{name}</div>{" "}
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
