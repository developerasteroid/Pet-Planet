import React, { useState } from 'react';
import './css/RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    shopName:'',
    photo: null,
    phoneNumber:'',
    email: '',
    dob: '',
    aadharNumber:'',
    BankAccountNo:'',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };
  const handleAcceptTerm = (e) => {
    const value = e.target.checked;
    setFormData({ ...formData, acceptTerms: value})
    console.log( value);
    // setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your registration logic here
    console.log('Form Data:', formData);
  };

  return (
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
          accept="image/*"
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
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
