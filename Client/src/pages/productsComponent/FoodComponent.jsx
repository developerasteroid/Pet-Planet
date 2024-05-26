import React from 'react';
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';  

const FoodComponent = (props) => {
  const dispatch = useDispatch();

  const addProduct = (product) => {
    if (product && product.id) {
      dispatch(addCart(product));
    } else {
      console.error("Product is undefined or missing id");
    }
  };

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
            <h4 className="text-uppercase text-primary">{props.Category}</h4>
            <h1 className="display-5 fw-bold text-secondary">{props.Breed}</h1>
            <p className="lead text-warning">
              <i className="fa fa-star"></i>
              {/* You can include rating here if available */}
            </p>
            <h3 className="display-6 my-4 text-success">Rs: {props.Price}</h3>
            <p className="lead text-muted">{props.Description}</p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <button
                className="btn btn-outline-primary me-3"
                onClick={() => addProduct(props.Product)} // Ensure props.Product is passed
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn btn-primary">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodComponent
