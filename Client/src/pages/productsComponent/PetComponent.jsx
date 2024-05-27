import React from 'react';
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';  
import axiosInstance from '../../helper/axiosInstance';
import { logout } from '../../helper/functions';
import { toast } from 'react-toastify';
import { fetchData } from '../../redux/action';

const PetComponent = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const currentDate = new Date();

  const dateOfBirth = new Date(props.Dob);

  const differenceInTime = currentDate - dateOfBirth;


  // Calculate the difference in days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));


  const addproductToCart = async(productId) => {
    try {
      const response = await axiosInstance.post('api/user/cart/item/add', {
        productId,
        quantity: 1
      });
      dispatch(fetchData());

      toast.info("Product added to cart");
    } catch(error) {
      if(error.response && error.response.status == 401){
        logout();
        navigate('/login');
      } else if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
      <div className="container my-5 py-4 pet-component">
        <div className="row align-items-center">
          <div className="col-md-6 col-sm-12 text-center">
            <img
              className="img-fluid rounded shadow"
              src={props.Photo}
              alt={props.Name}
              style={{ width: "100%", height: "auto", maxHeight: "500px" }}
            />
          </div>
          <div className="col-md-6 col-sm-12 py-5 text-center text-md-start">
            <h4 className="text-uppercase text-primary">{props.Name}</h4>
            <h1 className="display-5 fw-bold text-secondary">{props.Breed}</h1>
            <p className="lead">
              Gender: {props.Gender}
            </p>
            <p className="lead text-warning">
              Age: {differenceInDays} days
            </p>
            <h3 className="display-6 my-4 text-success">Rs: {props.Price}</h3>
            <p className="lead text-muted">
              Height: {props.Height}
              <br/>
              Length: {props.Length}
              <br/>
              Width: {props.Width}
              <br/>
              Weight: {props.Weight}
            </p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <button
                className="btn btn-outline-primary me-3"
                onClick={() => addproductToCart(props.pid)} // Ensure props.Product is passed
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-primary">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
       {props.FatherDetail ? (
         <>
            <h3 className='text-center display-8'>Blood Line details</h3>
              <div className="row align-items-center">
                <div className="col-md-6 col-sm-12 text-center">
                  <img
                    className="img-fluid rounded shadow"
                    src={props.FatherPhoto}
                    alt={props.Name}
                    style={{ width: "50%", height: "auto", maxHeight: "500px" }}
                  />
                </div>
                <div className="col-md-6 col-sm-12 py-5 text-center text-md-start">
                <h3 className="display-8 fw-bold">FatherDetail</h3>
                  <p className="lead">
                    {props.FatherDetail} in cm
                  </p>
                </div>
              </div>
              <div className="mt-2 row align-items-center">
                <div className="col-md-6 col-sm-12 text-center">
                  <img
                    className="img-fluid rounded shadow"
                    src={props.MotherPhoto}
                    alt={props.Name}
                    style={{ width: "50%", height: "auto", maxHeight: "500px" }}
                  />
                </div>
                <div className="col-md-6 col-sm-12 py-5 text-center text-md-start">
                <h3 className="display-8 fw-bold">MotherDetail</h3>
                  <p className="lead">
                    {props.FatherDetail} in cm
                  </p>
                </div>
              </div>

         </>
       ):
       (<>
       </>)}

       {props.Certified ? (
        <>
           <h3 className='text-center display-8'>Certified</h3>
           <div className="mt-2 row align-items-center justify-content-center"> 
                  <img
                    className="img-fluid rounded shadow"
                    src={props.CertificatePhoto}
                    alt={props.Name}
                    style={{ width: "30%", height: "auto", maxHeight: "500px" }}
                  />
                </div>
        </>
         ): (<>

         </>)
       }
           <div className="mt-5 row align-items-center justify-content-center"> 
                  <div><span className='section'><b>Description:</b></span> {props.Description}</div>
                </div>
      </div>
    </>
  );
};

export default PetComponent;
