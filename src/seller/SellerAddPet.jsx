import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SellerAddPet.css';
import sellerAxiosInstance from '../helper/sellerAxios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SellerAddPet = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    petType: '',
    petBreed: '',
    name: '',
    dob: '',
    quantity: '',
    gender: '',
    height: '',
    length: '',
    width: '',
    weight: '',
    petImage: null,
    certified: false,
    certificateImage: null,
    bloodline: false,
    motherImage: null,
    motherHeight: '',
    motherWeight: '',
    fatherImage: null,
    fatherHeight: '',
    fatherWeight: '',
    maleQuantity: '',
    femaleQuantity: '',
    price: '',
    malePrice: '',
    femalePrice: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.checked;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitted) {
      return;
    }

    if (formData.maleQuantity < 0 || formData.femaleQuantity < 0 || (((parseInt(formData.maleQuantity) + parseInt(formData.femaleQuantity)) !== parseInt(formData.quantity)) && formData.quantity !== 1)) {
      toast.error('Invalid Quantity Value');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to sell this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sell it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      setIsSubmitted(true);

      try {
        const formDataToSend = new FormData();

        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('photo', formData.petImage);
        formDataToSend.append('weight', formData.weight);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('type', formData.petType);
        formDataToSend.append('breed', formData.petBreed);
        formDataToSend.append('dob', formData.dob);

        formDataToSend.append('height', formData.height);
        formDataToSend.append('width', formData.width);
        formDataToSend.append('length', formData.length);
        formDataToSend.append('certified', formData.certified);
        if (formData.certified) {
          formDataToSend.append('certificatePhoto', formData.certificateImage);
        }
        if (formData.bloodline) {
          formDataToSend.append('fatherPhoto', formData.fatherImage);
          formDataToSend.append('motherPhoto', formData.motherImage);
          formDataToSend.append('fatherDetail', 'height: ' + formData.fatherHeight + '\nweight: ' + formData.fatherWeight);
          formDataToSend.append('motherDetail', 'height: ' + formData.motherHeight + '\nweight: ' + formData.motherWeight);
        }

        // For male pets
        if (formData.maleQuantity > 0 && formData.quantity > 1) {
          formDataToSend.append('quantity', formData.maleQuantity);
          formDataToSend.append('gender', 'male');

          let response = await sellerAxiosInstance.post('api/seller/add/product/pet', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.status === 200 && response.data && response.data.message) {
            toast.success(response.data.message + `\nMale-${formData.maleQuantity}`);
          }

          formDataToSend.delete('quantity');
          formDataToSend.delete('gender');
        }

        // For female pets
        if (formData.femaleQuantity > 0 && formData.quantity > 1) {
          formDataToSend.append('quantity', formData.femaleQuantity);
          formDataToSend.append('gender', 'female');

          let response = await sellerAxiosInstance.post('api/seller/add/product/pet', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.status === 200 && response.data && response.data.message) {
            toast.success(response.data.message + `\nFemale-${formData.femaleQuantity}`);
          }
        }
        if (formData.quantity === 1) {
          formDataToSend.append('quantity', formData.quantity);
          formDataToSend.append('gender', formData.gender === 'Male' ? 'male' : 'female');

          let response = await sellerAxiosInstance.post('api/seller/add/product/pet', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.status === 200 && response.data && response.data.message) {
            toast.success(response.data.message + `\n${formData.gender}-${formData.femaleQuantity}`);
          }
        }

        setIsSubmitted(false);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            navigate('/seller/login', { replace: true });
          } else if (error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
        } else {
          toast.error(error.message);
        }

        setIsSubmitted(false);
      }
    } else {
      // If canceled
      setIsSubmitted(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="pet-mainContainer">
        <div className="pet-form-container">
          <h2 className="pet-form-title">Sell Pet</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="petType">Select Pet:</label>
            <select
              name="petType"
              id="petType"
              className="pet-input-field"
              value={formData.petType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>

            <label htmlFor="petBreed">Select Breed:</label>
            <select
              name="petBreed"
              id="petBreed"
              className="pet-input-field"
              value={formData.petBreed}
              onChange={handleInputChange}
              required
            >
              {formData.petType === 'Dog' && (
                <>
                  <option value="">Select</option>
                  <option value="German_Shepherd">German-Shepherd</option>
                  <option value="Bulldog">Bulldog</option>
                  <option value="Labrador_Retriever">Labrador-Retriever</option>
                  <option value="Golden_Retriever">Golden-Retriever</option>
                  <option value="Pug">Pug</option>
                  <option value="other">other</option>
                </>
              )}
              {formData.petType === 'Cat' && (
                <>
                  <option value="">Select</option>
                  <option value="Persian">Persian</option>
                  <option value="Himalayan-Perisan">Himalayan-Perisan</option>
                  <option value="other">other</option>
                </>
              )}
            </select>

            <label htmlFor="name">Title of Product:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="food-input-field"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="age">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              id="dob"
              className="pet-input-field"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              placeholder="Quantity in number (*Required)"
              name="quantity"
              id="quantity"
              className="pet-input-field"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="height">Height (in CM):</label>
            <input
              type="number"
              name="height"
              id="height"
              className="pet-input-field"
              value={formData.height}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="length">Length (in CM):</label>
            <input
              type="number"
              name="length"
              id="length"
              className="pet-input-field"
              value={formData.length}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="width">Width (in CM):</label>
            <input
              type="number"
              name="width"
              id="width"
              className="pet-input-field"
              value={formData.width}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="weight">Weight (in KG):</label>
            <input
              type="number"
              name="weight"
              id="weight"
              className="pet-input-field"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="petImage">Image:</label>
            <input
              type="file"
              name="petImage"
              id="petImage"
              className="pet-input-field"
              accept="image/*"
              onChange={handleFileUpload}
              required
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              placeholder="Price in (₹)"
              name="price"
              id="price"
              className="pet-input-field"
              value={formData.price}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              className="pet-input-field"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="certified"
                id="certified"
                checked={formData.certified}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="certified">Certified Pet</label>
            </div>

            {formData.certified && (
              <>
                <label htmlFor="certificateImage">Certificate Image:</label>
                <input
                  type="file"
                  name="certificateImage"
                  id="certificateImage"
                  className="pet-input-field"
                  accept="image/*"
                  onChange={handleFileUpload}
                  required
                />
              </>
            )}

            <div className="checkbox-container">
              <input
                type="checkbox"
                name="bloodline"
                id="bloodline"
                checked={formData.bloodline}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="bloodline">Add Bloodline Details</label>
            </div>

            {formData.bloodline && (
              <>
                <label htmlFor="motherImage">Mother Image:</label>
                <input
                  type="file"
                  name="motherImage"
                  id="motherImage"
                  className="pet-input-field"
                  accept="image/*"
                  onChange={handleFileUpload}
                  required
                />

                <label htmlFor="motherHeight">Mother Height (in CM):</label>
                <input
                  type="number"
                  name="motherHeight"
                  id="motherHeight"
                  className="pet-input-field"
                  value={formData.motherHeight}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="motherWeight">Mother Weight (in KG):</label>
                <input
                  type="number"
                  name="motherWeight"
                  id="motherWeight"
                  className="pet-input-field"
                  value={formData.motherWeight}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="fatherImage">Father Image:</label>
                <input
                  type="file"
                  name="fatherImage"
                  id="fatherImage"
                  className="pet-input-field"
                  accept="image/*"
                  onChange={handleFileUpload}
                  required
                />

                <label htmlFor="fatherHeight">Father Height (in CM):</label>
                <input
                  type="number"
                  name="fatherHeight"
                  id="fatherHeight"
                  className="pet-input-field"
                  value={formData.fatherHeight}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="fatherWeight">Father Weight (in KG):</label>
                <input
                  type="number"
                  name="fatherWeight"
                  id="fatherWeight"
                  className="pet-input-field"
                  value={formData.fatherWeight}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <label htmlFor="gender">Select Gender:</label>
            <select
              name="gender"
              id="gender"
              className="pet-input-field"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {formData.gender === 'Male' && (
              <>
                <label htmlFor="maleQuantity">Male Quantity:</label>
                <input
                  type="number"
                  name="maleQuantity"
                  id="maleQuantity"
                  className="pet-input-field"
                  value={formData.maleQuantity}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="malePrice">Male Price:</label>
                <input
                  type="number"
                  name="malePrice"
                  id="malePrice"
                  className="pet-input-field"
                  value={formData.malePrice}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {formData.gender === 'Female' && (
              <>
                <label htmlFor="femaleQuantity">Female Quantity:</label>
                <input
                  type="number"
                  name="femaleQuantity"
                  id="femaleQuantity"
                  className="pet-input-field"
                  value={formData.femaleQuantity}
                  onChange={handleInputChange}
                  required
                />

                <label htmlFor="femalePrice">Female Price:</label>
                <input
                  type="number"
                  name="femalePrice"
                  id="femalePrice"
                  className="pet-input-field"
                  value={formData.femalePrice}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <button type="submit" className="pet-submit-button" disabled={isSubmitted}>
              {isSubmitted ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellerAddPet;
