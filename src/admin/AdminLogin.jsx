import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/AdminLogin.css"

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log(formData);
  };

  return (
    <>
      <ToastContainer />
      <div className="AdminLoginMainContainer">
        <div className="AdminLoginFormContainer">
          <h2 className="AdminLoginFormTitle">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="loginEmail">Email:</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              className="AdminLoginInputField"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="loginPassword">Password:</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              className="AdminLoginInputField"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="AdminLoginSubmitButton">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

