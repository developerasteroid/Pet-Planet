import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './../redux/action';
import axiosInstance from "../helper/axiosInstance";
import { toast } from "react-toastify";
import { logout } from "../helper/functions";

const Cart = () => {
  const data = useSelector(state => state.data);
  const cartError = useSelector(state => state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(fetchData());
  },[dispatch]);

  useEffect(()=>{
    if(cartError){
      if(cartError.response && cartError.response.status == 401){
        navigate('/login');
      } else if(cartError.response && cartError.response.data && cartError.response.data.message){
          toast.error(cartError.response.data.message);
      } else {
          toast.error(cartError.message);
      }
    }
  }, [cartError])



  
  const addproductToCart = async(productId) => {
    try {
      const response = await axiosInstance.post('api/user/cart/item/add', {
        productId,
        quantity: 1
      });
      dispatch(fetchData());

      // toast.info("Product added to cart");
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

  const removeProductFromCart = async(productId) => {
    try {
      const response = await axiosInstance.post('api/user/cart/item/remove', {
        productId,
        quantity: 1
      });
      dispatch(fetchData());

      // toast.info("Product removed from cart");
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
  

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };


  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 0;
    let totalItems = 0;
    data.map((item) => {
      return (subtotal += item.product.price * item.quantity);
    });

    data.map((item) => {
      return (totalItems += item.quantity);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {data.map((item) => {
                      return (
                        <div key={item._id}>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={item.product.photo}
                                  // className="w-100"
                                  alt={item.product.name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.product.name}</strong>
                                {
                                  item.product.quantity <= 0 &&
                                <span className="text-danger"><br />Out of Stock</span>
                                }
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    removeProductFromCart(item.product._id)
                                  }}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <p className="mx-5">{item.quantity}</p>

                                <button
                                  className="btn px-3"
                                  onClick={() => {
                                    addproductToCart(item.product._id)
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <p className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">{item.quantity}</span>{" "}
                                  x Rs{item.product.price}
                                </strong>
                              </p>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})<span>Rs {Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Rs {shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>Rs {Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Link
                      to="/checkout"
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {data.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
