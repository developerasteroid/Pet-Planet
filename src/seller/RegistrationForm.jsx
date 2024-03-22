import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/RegistrationForm.css';
import Counter from '../component/Counter';

const RegistrationForm = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [otpSendDisable, setOtpSendDisable] = useState(false);
  const [showOtpCounter, setShowOtpCounter] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    shopName:'',
    photo: null,
    phoneNumber:'',
    email: '',
    otp:'',
    dob: '',
    aadharNumber:'',
    BankAccountNo:'',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  useEffect(() => {
    if(alertMessage != null){
      setShowAlert(true);
    }
  }, [alertMessage]);

  const notify = (message) => {
    toast.success(message);
  };

  const CustomAlert = () => {
    if(alertMessage == null){
      return;
    }
    return(
      <div className='overlay'>
      <div className='alertBoxMainContainer'>
        <div className='alertText'><h2>Alert</h2></div>
      <div className='alertMessageContainer'>
        <p>{alertMessage}</p>
        <button className='alert-close-btn' onClick={() => {setShowAlert(false); setAlertMessage(null);}}></button>
      </div>
      </div>
      </div>
    );
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file && allowedTypes.includes(file.type)) {
      // Handle valid file upload
      setFormData({ ...formData, photo: file });
    } else {
      e.target.value = null;
      setFormData({ ...formData, photo: null });
      setAlertMessage('Please select a valid JPG, JPEG, or PNG image.');
    }
  };
  const handleAcceptTerm = (e) => {
    const value = e.target.checked;
    setFormData({ ...formData, acceptTerms: value})
    // console.log( value);
    // setFormData({ ...formData, [name]: value });
  };


  // Email syntax validation
  const isValidEmail = (email) => {
    // Basic email format validation using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


  const sendOtp = async() => {
    if(otpSendDisable){
      return;
    }
    if(formData.email == ''){
      setAlertMessage('Email field is Empty');
      return;
    }
    if(!isValidEmail(formData.email)){
      setAlertMessage('Invalid Email');
      return;
    }
    setOtpSendDisable(true);

    try {
      const response = await fetch('http://localhost:3030/api/auth/seller/sendotp', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:formData.email})
      });
      if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Failed to Send OTP');
      }
      // Handle successful submission, if needed
      setShowOtpCounter(true);
      notify('OTP sent to your Email Successfully');
    } catch (error) {
      // Handle error
      setAlertMessage(error.message);
      setOtpSendDisable(false);
    }

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitDisable(true);

    // Implement your registration logic here
    // console.log('Form Data:', formData);
    if(formData.password != formData.confirmPassword){
      setFormData({ ...formData, ['confirmPassword']: '' });
      setAlertMessage('Password does not match.');
      setSubmitDisable(false);
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('photo', formData.photo);
    formDataToSend.append('shopName', formData.shopName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('otp', formData.otp);
    formDataToSend.append('dateOfBirth', formData.dob);
    formDataToSend.append('mobileNumber', formData.phoneNumber);
    formDataToSend.append('adharNumber', formData.aadharNumber);
    formDataToSend.append('bankAccountNumber', formData.BankAccountNo);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('acceptTerms', formData.acceptTerms);

    try {
      const response = await fetch('http://localhost:3030/api/auth/seller/register', {
        method: 'POST',
        body: formDataToSend
      });

      if(!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to register seller');
      }
      const responseJson = await response.json();
      notify(responseJson.message);
      setSubmitDisable(false);

    } catch (error) {
      setAlertMessage(error.message);
      setSubmitDisable(false);
    }


  };

  return (
    <>
    {showAlert && CustomAlert()}
    <ToastContainer />
    <div className="mainContainer">
    <div className="form-container">
      <h2 className="form-title">Seller Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='sellerFullName'>Full Name:</label>
        <input
          type="text"
          name="fullName"
          id='sellerFullName'
          className="input-field"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='sellerPhoto'>Upload a photo for your profile:</label>
        <input
          type="file"
          id='sellerPhoto'
          accept="image/jpeg, image/png, image/jpg"
          name="photo"
          className="photo-input"
          onChange={handlePhotoUpload}
          required
        />
        <label htmlFor='sellerShopName'>Shop Name:</label>
        <input
          type="text"
          id='sellerShopName'
          name="shopName"
          className="input-field"
          placeholder="Shop Name(Optional)"
          value={formData.shopName}
          onChange={handleInputChange}
        />
        <label htmlFor='sellerEmail'>Email:</label>
        <input
          type="email"
          id='sellerEmail'
          name="email"
          className="input-field"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {showOtpCounter? <div className='counter'><Counter seconds={120} callback={()=>{setOtpSendDisable(false); setShowOtpCounter(false)}}/></div> : <div className={'otp-button ' + (otpSendDisable? 'freeze-btn' : '')} onClick={sendOtp}>Send OTP</div>}
        <input
          type="text"
          id='sellerOtp'
          name="otp"
          className="input-field"
          placeholder="OTP"
          value={formData.otp}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='sellerDob'>Date of Birth:</label>
        <input
          type="date"
          id='sellerDob'
          name="dob"
          className="input-field"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='sellerPhoneNo'>Phone Number:</label>
        <input
          type="text"
          id='sellerPhoneNo'
          name="phoneNumber"
          className="input-field"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='sellerAadharNo'>Aadhar Number:</label>
        <input
          type="text"
          id='sellerAadharNo'
          name="aadharNumber"
          className="input-field"
          placeholder="Aadhar Number"
          value={formData.aadharNumber}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='sellerBankAccNo'>Bank Account Number:</label>
        <input
          type="text"
          id='sellerBankAccNo'
          name="BankAccountNo"
          className="input-field"
          placeholder="Bank Account No"
          value={formData.BankAccountNo}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='sellerCreatePassword'>Create Password:</label>
        <input
          type="password"
          id='sellerCreatePassword'
          name="password"
          className="input-field"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='sellerConfirmPassword'>Confirm Password:</label>
        <input
          type="password"
          id='sellerConfirmPassword'
          name="confirmPassword"
          className="input-field"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <div>
        <input
          type="checkbox"
          name="acceptTerms"
          className="term-input"
          onChange={handleAcceptTerm}
          required
        />
        <label className='accept-terms'>Accept <a href="">Terms</a> and <a href="">conditions</a></label>
        </div>
        <button type="submit" className={"submit-button " + (submitDisable? 'freeze-btn' : '')} disabled={submitDisable}>Register</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default RegistrationForm;
