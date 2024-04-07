import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/LoginForm.css";
import {useNavigate} from 'react-router-dom';

const SellerLogin = () => {
  const navigate = useNavigate();
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
      <div className="LoginMainContainer">
        <div className="LoginFormContainer">
          <h2 className="LoginFormTitle">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="loginEmail">Email:</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              className="LoginInputField"
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
              className="LoginInputField"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="LoginSubmitButton">
              Login
            </button>
            <div className="LoginDiv" onClick={()=>{navigate('/seller/register')}}>
              Don't have an account? Register
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellerLogin;


