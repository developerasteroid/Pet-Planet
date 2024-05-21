import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import '../css/css1.css';

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    };

    const handleAcceptTerm = (e) => {
        const value = e.target.checked;
        setformdata({ ...formdata, acceptterms: value})
        // setformdata({ ...formdata, [name]: value });
      };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
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
                                    style={{
                                        MozAppearance: 'textfield',
                                        WebkitAppearance: 'none',
                                    }}
                                />
                                <style>
                                    {`
                                        input[type=number]::-webkit-inner-spin-button,
                                        input[type=number]::-webkit-outer-spin-button {
                                            -webkit-appearance: none;
                                            margin: 0;
                                        }
                                        input[type=number] {
                                            -moz-appearance: textfield;
                                        }
                                    `}
                                </style>
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
                                />
                                 <Link to="/terms" className="terms">accept terms and policy</Link> </p>
                                    
                            </div>

                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" disabled>
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
