import React from 'react'
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../helper/axiosInstance';
import { toast } from 'react-toastify';
import { logout } from '../../helper/functions';
import { fetchData } from '../../redux/action';

const AccessoryComponent = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

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
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={props.Photo}
            alt={props.Name}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{props.Category}</h4>
          <h1 className="display-5">{props.Name}</h1>
          <p className="lead">
            {/* {product.rating && product.rating.rate}{" "} */}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6  my-4">Rs{props.Price}</h3>
          <p className="lead">{props.Description}</p>
          <button
            className="btn btn-outline-dark"
            onClick={() => addproductToCart(props.pid)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  </>
  )
}

export default AccessoryComponent
