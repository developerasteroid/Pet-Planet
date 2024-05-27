import React from "react";
import { Footer, Navbar } from "../components";


const Orders = () => {

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
                  <div className="card-body">
                        <div>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src="123"
                                  // {props.Photo}
                                  className="w-100"
                                  alt="product pic"
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>
                                  {/* {item.Name} */}
                                  Name
                                  </strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>
                              <p className="text-start text-md-center">
                                <strong>
                                  {/* <span className="text-muted">{item.qty}</span>{" "} */}
                                  <span className="text-muted">
                                    {/* {Quantity} */}
                                    Quantity
                                    </span>{" "}
                                  x Rs 
                                  {/* {item.price} */}
                                  100
                                </strong>
                              </p>
                            </div>
                          </div>
                          <hr className="my-4" />
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
        <h1 className="text-center">Your Orders</h1>
        <hr />
        {10 > 0 ? <Ordereditems /> : <></>}
      </div>
      <Footer />
    </>
  );
};


export default Orders
