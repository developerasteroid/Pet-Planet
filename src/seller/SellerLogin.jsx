import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/LoginForm.css";
import {useNavigate} from 'react-router-dom';
import sellerAxiosInstance from "../helper/sellerAxios";

const SellerLogin = () => {
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
      const response = await sellerAxiosInstance.post('api/auth/seller/login', formData);
      if(response.status === 200 && response.data.token){
        localStorage.setItem('sellerToken', response.data.token);
        navigate('/seller', {replace: true});
      } else {
        throw new Error("Not able to Login. Server Error");
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
    setIsSubmitted(false);


  };

  return (
    <>
      
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


