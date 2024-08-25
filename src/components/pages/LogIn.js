import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./LogIn.css";

function LogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Modify the handleSubmit function in your LogIn component

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login successful:", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });

    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username (Email)</label>
          <input
            type="email"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn-login">
            Login
          </button>
        </div>
        <div className="form-group">
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
        </div>
        <div className="form-group">
          <Link to="/sign-up" className="btn-signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
