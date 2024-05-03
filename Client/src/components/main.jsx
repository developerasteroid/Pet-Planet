import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/puppy.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">Pet Planet</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Welcome to our digital sanctuary, where every purr, bark, 
              and chirp finds its perfect match. Explore our virtual aisles, 
              brimming with everything your beloved companions could ever desire – from 
              gourmet treats to cozy beds and beyond. Let's embark on this journey together, 
              crafting memories and tail-wagging moments that will last a lifetime
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
