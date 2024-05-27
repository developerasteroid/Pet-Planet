import React from "react";
import { Footer, Navbar } from "../components";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                        <div className="col-lg-3 col-md-12 text-center">
                          <div
                            className="bg-image rounded"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src="http://localhost:3030/image/product/IMG-26f0ea43af8b4d34a470672261cd76db.jpg"
                              className="w-100"
                              alt="product pic"
                              style={{ maxWidth: "100px", maxHeight: "75px" }}
                            />
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-6 text-center text-lg-start">
                          <p>
                            <strong>Name</strong>
                            <br />
                            <span className="text-muted">Quantity: 2</span> {/* Adjust Quantity here */}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center text-lg-end">
                          <p className="text-end text-md-center">
                            <strong>
                              Total Price: Rs 200 {/* Adjust Total Price here */}
                            </strong>
                          </p>
                          <p className="text-end text-md-center">
                            <strong>
                              Delivery Status
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

export default Orders;
