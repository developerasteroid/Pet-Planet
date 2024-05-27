import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axiosInstance from '../helper/axiosInstance'
import { toast } from 'react-toastify'
import { logout } from '../helper/functions'

const Navbar = () => {
    const state = useSelector(state => state.data)
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(()=> {
        (async()=>{
            try {
                const response = await axiosInstance.get('api/user/authenticate');
                if(response.status ==200){
                    setisLoggedIn(true);
                }
            } catch(error) {
                if(error.response && error.response.status == 401){
                    setisLoggedIn(false);
                } else {
                    toast.error(error.message);
                }
            }
        })();
    }, []);


    const logoutUser = () => {
        logout();
        setisLoggedIn(false);
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/"> Pet Planet</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/orders">Orders </NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {
                            isLoggedIn ? 
                            <NavLink className="btn btn-outline-dark m-2" onClick={logoutUser}
                            ><i className="fa fa-sign-out-alt mr-1"></i>Logout</NavLink> : 
                        (
                            <>
                                <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                                <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                            </>
                        )
                    }
                        <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart {state.length ? `(${state.length})` : null}</NavLink>
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar