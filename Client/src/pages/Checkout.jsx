import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { toast } from "react-toastify";
import axiosInstance from "../helper/axiosInstance";
import { logout } from "../helper/functions";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/action";


export default function Checkout () {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formdata, setformdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phno: "",
        address: "",
        country: "",
        state: "",
        zip: ""
    });

    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    

    const [totalItems, setToatalItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);


    useEffect(()=>{

        (async()=>{
            try {
                const response = await axiosInstance.get('api/user/cart');
                if(response.status==200 && response.data){
                    setCart(response.data);
                    let tItems = 0;
                    let sTotal = 0;
                    response.data.forEach(item => {
                        sTotal += item.product.price * item.quantity;
                        tItems += item.quantity;
                    });
                    setSubtotal(sTotal);
                    setToatalItems(tItems);
                    setIsLoading(false);
                }
            } catch (error){
                if(error.response && error.response.status == 401){
                    navigate('/login');
                } else if(error.response && error.response.data && error.response.data.message){
                    toast.error(error.response.data.message);
                } else {
                    toast.error(error.message);
                }
            }
        })();
        
    }, [axiosInstance]);


    useEffect(()=>{
      let error = 0;
      for(let item of cart){
        if(item.quantity > item.product.quantity){
          error += 1 ;
         toast.error(`The order quantity of "${item.product.name}" exceeds the available stock (${item.product.quantity}).`);
        }
      }
      if(error > 0){
        navigate('/cart');
      }
    }, [cart])



    const handleOnInputchange = (e) => {
      const { name, value } = e.target;
      setformdata((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const orderedProduct = [];
    let successCount = 0;

    for(let item of cart){
      let data = {
        productId:item.product._id,
        quantity:item.quantity,
        customerName: `${formdata.firstName} ${formdata.lastName}`,
        email: formdata.email,
        mobileNumber: formdata.phno,
        address: `${formdata.address}, ${formdata.state}, ${formdata.country}, ${formdata.zip}`
      }
      try {
        const response = await axiosInstance.post('api/user/order/item', data);
        if(response.status == 200){
          successCount += 1;
          orderedProduct.push({
            productId: item.product._id,
            quantity: item.quantity
          })
        }
      } catch (error) {
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

    for(let item of orderedProduct){
      try {
        const response = await axiosInstance.post('api/user/cart/item/remove', item);
      } catch (error) {
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

    if(successCount > 0){
      toast.success(`${successCount} Product${successCount > 1 ? 's' : ''} ordered Successfully`);
      dispatch(fetchData());
      navigate('/orders');
    }
    
    



    setIsLoading(false);
  };
    



    if(isLoading){
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

    if(cart.length == 0){
        return (
            <>
            <Navbar />
            <div className="container">
              <div className="row">
                <div className="col-md-12 py-5 bg-light text-center">
                  <h4 className="p-3 display-5">No item in Cart</h4>
                  <Link to="/" className="btn btn-outline-dark mx-4">
                    <i className="fa fa-arrow-left"></i> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            <Footer />
            </>
          );
    }

    return (
        <>
        <Navbar />
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products {`(${totalItems})`}
                      <span>Rs {subtotal}</span>
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
                        <strong>Rs {Math.round(shipping + subtotal)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleOnSubmit}>
                    <div className="row g-3">
                      <div className="col-sm-6 my-1">
                        <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          placeholder=""
                          value={formdata.firstName}
                          onChange={handleOnInputchange}
                          required
                        />
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={formdata.lastName}
                          onChange={handleOnInputchange}
                          placeholder=""
                          required
                        />
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formdata.email}
                          onChange={handleOnInputchange}
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div className="col-sm-6 my-1">
                        <label htmlFor="phno" className="form-label">
                          Phone-number
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="phno"
                          name="phno"
                          value={formdata.phno}
                          onChange={handleOnInputchange}
                          required
                        />
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={formdata.address}
                          onChange={handleOnInputchange}
                          placeholder="Enter the address"
                          required
                        />
                      </div>

                      <div className="col-md-5 my-1">
                        <label htmlFor="country" className="form-label">
                          Country
                        </label>
                        <br />
                        <select
                          className="form-select"
                          id="country"
                          name="country"
                          value={formdata.country}
                          onChange={handleOnInputchange}
                          required
                        >
                          <option value="">Choose...</option>
                          <option value="India">India</option>
                        </select>
                      </div>

                      <div className="col-md-4 my-1">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <br />
                        <select
                          className="form-select"
                          id="state"
                          name="state"
                          value={formdata.state}
                          onChange={handleOnInputchange}
                          required
                        >
                          <option value="">Choose...</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="West Bengal">West Bengal</option>
                        </select>
                      </div>

                      <div className="col-md-3 my-1">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          name="zip"
                          placeholder=""
                          value={formdata.zip}
                          onChange={handleOnInputchange}
                          required
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3">Payment</h4>

                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="Payment" className="form-label">
                          Only Cash On Delivery
                        </label>
                      </div>
                    </div>

                    <button className="w-100 btn btn-primary" type="submit">
                      Order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
}