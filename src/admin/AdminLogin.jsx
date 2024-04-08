import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/AdminLogin.css"
import adminAxiosInstance from "../helper/adminAxios";
import {useNavigate} from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(isSubmitted){
      return;
    }
    setIsSubmitted(true);
    try {
      const response = await adminAxiosInstance.post('api/auth/admin/login', formData);
      if(response.status === 200 && response.data.token){
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin', {replace: true});
      } else {
        throw new Error("Not able to Login. Server Error");
      }
      setIsSubmitted(false);
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      setIsSubmitted(false);
    }
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
            <button type="submit" className="AdminLoginSubmitButton" disabled={isSubmitted}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;

