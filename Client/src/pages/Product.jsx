import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams, useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";
import PetComponent from "./productsComponent/PetComponent";
import AccessoryComponent from "./productsComponent/AccessoryComponent";
import FoodComponent from "./productsComponent/FoodComponent";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Changed initial state to null
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const Location = useLocation();
  const dispatch = useDispatch();
  

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      try {
        const response = await fetch(`http://localhost:3030/api/user/product/${id}`);
        const data = await response.json();
        console.log("the data is",data);
        setProduct(data); // Set product data as object

        setLoading(false);

        const response2 = await fetch(`http://localhost:3030/api/user/get/products/category/${data.category}`);
        const data2 = await response2.json();
        setSimilarProducts(data2);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoading2(false);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [Location]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => {
    if (!product) return null;
  
    if (product.category === "pet") {
      return (
        <PetComponent
          Photo={product.photo}
          Name={product.name}
          Breed={product.breed}
          Gender={product.gender}
          Category={product.category}
          Dob={product.dateOfBirth}
          Price={product.price}
          Description={product.description}
          Product={product}
          Height={product.height}
          Weight={product.weight}
          Length={product.length}
          Width={product.width}
          FatherPhoto={product.fatherPhoto}
          FatherDetail={product.fatherDetail}
          MotherPhoto={product.motherPhoto}
          MotherDetail={product.motherDetail}
          CertificatePhoto={product.certificatePhoto}
          Certified={product.certified}
        />
      );
    } else if (product.category === "accessory") {
      return (
        <AccessoryComponent
          Photo={product.photo}
          Name={product.name}
          Category={product.category}
          Price={product.price}
          Description={product.description}
          Product={product} // Pass the entire product object here
        />
      );
    } else if (product.category === "food") {
      return (
        <FoodComponent
          Photo={product.photo}
          Name={product.name}
          Category={product.category}
          Price={product.price}
          Description={product.description}
          Product={product} // Pass the entire product object here
        />
      );
    }
    return null;
  };
  

  const Loading2 = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
        <div className="mx-4">
          <Skeleton height={400} width={250} />
        </div>
      </div>
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts.map((item) => (
          
          <div key={item.id} className="card mx-4 text-center">
            <img
              className="card-img-top p-3"
              src={item.photo}
              alt="Card"
              height={300}
              width={300}
            />
            <div className="card-body">
              <h5 className="card-title">{item.name.substring(0, 15)}...</h5>
            </div>
            <div className="card-body">
              <Link to={"/product/" + item.id} className="btn btn-dark m-1">
                View product
              </Link>
              <button
                className="btn btn-dark m-1"
                onClick={() => addProduct(item)} // Ensured addProduct is correctly called
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
