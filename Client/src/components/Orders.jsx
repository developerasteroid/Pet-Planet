import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../helper/axiosInstance";

const Orders = () => {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();


  useEffect(()=>{
    (async()=>{
      try {
        const response = await axiosInstance.get('api/user/get/ordered/product');
        if(response.status==200 && response.data){
          setData(response.data);
          setIsDataLoaded(true);
        }
      } catch(error){
        if(error.response && error.response.status == 401){
            navigate('/login');
        } else if(error.response && error.response.data && error.response.data.message){
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
      }
    })();
  },[])

  const Ordereditems = () => {
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
                  {
                    data.map((item)=>(

                  <div className="card-body">
                    <div>
                      <div className="row d-flex align-items-center">
                        <div className="col-lg-3 col-md-12 text-center">
                          <div
                            className="bg-image rounded"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src={item.photo}
                              className="w-100"
                              alt="product pic"
                              style={{ maxWidth: "100px", maxHeight: "75px" }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-6 text-center text-lg-start">
                          <p>
                            <strong>{item.productTitle}</strong>
                            <br />
                            <span className="text-muted">Quantity: {item.quantity}</span> {/* Adjust Quantity here */}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center text-lg-end">
                          <p className="text-end text-md-center">
                            <strong>
                              Total Price: Rs {item.totalAmount} {/* Adjust Total Price here */}
                            </strong>
                          </p>
                          <p className="text-end text-md-center">
                            <span>
                              Status: {item.status}
                            </span>
                          </p>
                        </div>
                      </div>
                      <hr className="my-4" />
                    </div>
                  </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };


  if(!isDataLoaded){
    return (
      <>
      <Navbar />
        <div className="d-flex justify-content-center align-items-center" style={{height: 400}}>
          <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Your Orders</h1>
        <hr />
        {10 > 0 ? <Ordereditems /> : <></>}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
