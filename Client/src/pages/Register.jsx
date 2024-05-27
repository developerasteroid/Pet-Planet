import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import '../css/css1.css';
import { toast } from 'react-toastify';
import axiosInstance from '../helper/axiosInstance';

const Register = () => {
    const [formdata, setformdata] = useState({
        fullName: '',
        email: '',
        otp: '',
        dob: '',
        phno:'',
        password:'',
        acceptterms: false
    });

    const [OtpState, setOtpState] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    };

    const handleAcceptTerm = (e) => {
        const value = e.target.checked;
        setformdata({ ...formdata, acceptterms: value})
        // setformdata({ ...formdata, [name]: value });
      };
      const handleOnclickRegister = async(e)=>{
        e.preventDefault();
        setIsSubmitted(true);
        if(!OtpState){
            try {
                const response = await axiosInstance.post('api/auth/user/sendotp', {email: formdata.email})
                if(response.status == 200){
                    toast.info("OTP sent to you email");
                    setOtpState(true);
                }
            } catch(error){
                if(error.response && error.response.data && error.response.data.message){
                    toast.error(error.response.data.message);
                } else {
                    toast.error(error.message)
                }
            }
        } else {
            console.log(formdata);
            const formDataToSend = new FormData();
            formDataToSend.append('fullName', formdata.fullName);
            formDataToSend.append('email', formdata.email);
            formDataToSend.append('dateOfBirth', formdata.dob);
            formDataToSend.append('mobileNumber', formdata.phno);
            formDataToSend.append('password', formdata.password);
            formDataToSend.append('acceptTerms', formdata.acceptterms);
            formDataToSend.append('otp', formdata.otp);

            try {
                const response = await axiosInstance.post('api/auth/user/register', formDataToSend);
                if(response.status == 200){
                    try {
                        const response = await axiosInstance.post('api/auth/user/login', {
                            email: formdata.email, 
                            password: formdata.password
                        });
                        if(response.status == 200 && response.data.token){
                            localStorage.setItem('userToken', response.data.token);
                            toast.success('Registered Successfully');
                            navigate('/');
                        }
                      } catch(error) {
                        if(error.response && error.response.data && error.response.data.message){
                          toast.error(error.response.data.message);
                        } else {
                          toast.error(error.message);
                        }
                      }
                }
            } catch(error){
                if(error.response && error.response.data && error.response.data.message){
                    toast.error(error.response.data.message);
                } else {
                    toast.error(error.message)
                }
            }
        }
        setIsSubmitted(false);
      }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleOnclickRegister}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formdata.fullName}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formdata.email}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formdata.dob}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="dob"
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="phno">Phone number</label>
                                <input
                                    type="number"
                                    name="phno"
                                    value={formdata.phno}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="phno"
                                    placeholder='Enter your phone number'
                                    required
                                />
                                
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formdata.password}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="form my-3 acceptterms">
                                <p>
                                <input
                                    type="checkbox"
                                    name="acceptterms"
                                    //checked={formdata.acceptterms} // Ensure checked attribute is set based on state
                                    onChange={handleAcceptTerm}
                                    id="acceptterms" // Make sure this ID matches the "for" attribute of the label
                                    required
                                />
                                 <Link to="/terms" className="terms">accept terms and policy</Link> </p>
                                    
                            </div>

                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>

                            { OtpState ? <>
                                <div className="form my-3">
                                <label htmlFor="otp">OTP</label>
                                <input
                                    type="number"
                                    name="otp"
                                    value={formdata.otp}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="otp"
                                    placeholder="Enter OTP"
                                    required
                                />
                            </div>

                            </> : <></> }

                           
                            <div className="text-center">
                                <button 
                                className="my-2 mx-auto btn btn-dark" 
                                type="submit" 
                                disabled={isSubmitted}
                                >
                                    Register
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

export default Register;
