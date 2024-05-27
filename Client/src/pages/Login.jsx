import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { toast } from "react-toastify";
import axiosInstance from "../helper/axiosInstance";

const Login = () => {
  const location = useLocation();
  const data = location.state?.data;
  const  [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      const response = await axiosInstance.post('api/auth/user/login', {email, password});
      if(response.status == 200 && response.data.token){
        localStorage.setItem('userToken', response.data.token);
        if(data){
          navigate(data);
        } else {
          navigate('/');
        }
      }
    } catch(error) {
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
    setIsSubmitted(false);
  }


  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled={isSubmitted}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
