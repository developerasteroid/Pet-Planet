import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SellerAddPet.css';
import sellerAxiosInstance from '../helper/sellerAxios';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import qr from './assets/qr.jpg'


const SellerAddPet = () => {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
      petType: '',
      petBreed:'',
      name:'',
      dob: '',
      quantity: '',
      gender: '',
      height: '',
      length: '',
      width: '',
      weight:'',
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
      price:'',
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
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(isSubmitted){
        return;
      }
      
      if(formData.maleQuantity < 0 || formData.femaleQuantity < 0 || (((parseInt(formData.maleQuantity) + parseInt(formData.femaleQuantity)) != parseInt(formData.quantity)) && formData.quantity != 1) ){
        toast.error('Invalid Quantity Value');
        return;
      }


      const pricePerPiece = 100;
      const result = await Swal.fire({
        title: `Pay ${ pricePerPiece * formData.quantity}Rs`,
        text: 'Are you sure you want to sell this product?',
        imageUrl: qr, // Use the imported image here
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Yes, Add Product!',
        cancelButtonText: 'No, cancel!',
        input: 'text',
        inputLabel: 'Transaction ID',
        inputPlaceholder: 'Enter Transaction ID',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to enter the Transaction ID!';
            }
        },
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Transaction ID is required');
            }
            return value;
        }
        });

      if (result.isConfirmed) {
        setIsSubmitted(true);
        
        
        // console.log('Form Data:', formData);
        try {
          const formDataToSend = new FormData();


          formDataToSend.append('name', formData.name);1
          formDataToSend.append('price', formData.price);1
          formDataToSend.append('photo',formData.petImage);
          formDataToSend.append('weight', formData.weight);1
          formDataToSend.append('description', formData.description);1
          formDataToSend.append('type', formData.petType);1
          formDataToSend.append('breed', formData.petBreed);1
          formDataToSend.append('dob', formData.dob);1
          
          formDataToSend.append('height', formData.height);1
          formDataToSend.append('width', formData.width);1
          formDataToSend.append('length', formData.length);1
          formDataToSend.append('certified', formData.certified);1
          if(formData.certified)
            formDataToSend.append('certificatePhoto', formData.certificateImage);
          if(formData.bloodline){
            formDataToSend.append('fatherPhoto', formData.fatherImage);1
            formDataToSend.append('motherPhoto', formData.motherImage);1
            formDataToSend.append('fatherDetail','height: '+formData.fatherHeight + '\nweight: '+ formData.fatherWeight);1
            formDataToSend.append('motherDetail', 'height: '+formData.motherHeight + '\nweight: '+ formData.motherWeight);  1
          }

          //for male pet
          if(formData.maleQuantity > 0 && formData.quantity > 1){
            formDataToSend.append('quantity', formData.maleQuantity);1
            formDataToSend.append('gender', 'male');1
            
            let response = await sellerAxiosInstance.post('api/seller/add/product/pet', formDataToSend, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            });
            if(response.status==200 && response.data && response.data.message){
              toast.success(response.data.message + `\nMale-${formData.maleQuantity}`);
            }
            
            formDataToSend.delete('quantity');
            formDataToSend.delete('gender');
            
            
          }


          //for female
          if(formData.femaleQuantity > 0 && formData.quantity > 1){
            formDataToSend.append('quantity', formData.femaleQuantity);
            formDataToSend.append('gender', 'female');
            
            let response = await sellerAxiosInstance.post('api/seller/add/product/pet', formDataToSend, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            });
            if(response.status==200 && response.data && response.data.message){
              toast.success(response.data.message + `\nFemale-${formData.femaleQuantity}`);
            }
          } 
          if(formData.quantity == 1){
            formDataToSend.append('quantity', formData.quantity);
            formDataToSend.append('gender', (formData.gender == "Male" ? 'male' : 'female'));
            
            let response = await sellerAxiosInstance.post('api/seller/add/product/pet', formDataToSend, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            });
            if(response.status==200 && response.data && response.data.message){
              toast.success(response.data.message + `\n${formData.gender}-${formData.femaleQuantity}`);
            }
          }

        } catch (error) {
          if(error.response){
            if(error.response.status === 401){
              navigate('/seller/login', {replace: true});
            } else if(error.response.data && error.response.data.message){
              toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
          } else {
            toast.error(error.message);
          }
        }

        setIsSubmitted(false);
      } else {
        //if canceled
      }
    };
  
    return (
      <>
      <ToastContainer/>
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
                {formData.petType === 'Dog' && 
                <>
                <option value="">Select</option>
                <option value="German_Shepherd">German-Shepherd</option>
                <option value="Bulldog">Bulldog</option>
                <option value="Labrador_Retriever">Labrador-Retriever</option>
                <option value="Golden_Retriever">Golden-Retriever</option>
                <option value="Pug">Pug</option>
                <option value="other">other</option>
                </>
                }
                  {formData.petType === 'Cat' && 
                <>
                <option value="">Select</option>
                <option value="Persian">Persian</option>
                <option value="Himalayan-Perisan">Himalayan-Perisan</option>
                <option value="other">other</option>
                
                </>
                }
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
                placeholder='Quantity in number (*Required)'
                name="quantity"
                id="quantity"
                className="pet-input-field"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
  
              {formData.quantity === '1' ? (
                <>
                  <label>Gender:</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        className='pet-radio'
                        checked={formData.gender === 'Male'}
                        onChange={handleInputChange}
                        required
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        className='pet-radio'
                        checked={formData.gender === 'Female'}
                        onChange={handleInputChange}
                        required
                      />
                      Female
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor="maleQuantity">Male Quantity:</label>
                  <input
                    type="number"
                    name="maleQuantity"
                    placeholder='Enter male quantity'
                    id="maleQuantity"
                    className="pet-input-field"
                    value={formData.maleQuantity}
                    onChange={handleInputChange}
                    
                  />
  
                  <label htmlFor="femaleQuantity">Female Quantity:</label>
                  <input
                    type="number"
                    name="femaleQuantity"
                    placeholder='Enter female quantity'
                    id="femaleQuantity"
                    className="pet-input-field"
                    value={formData.femaleQuantity}
                    onChange={handleInputChange}
                    
                  />
                </>
              )}
  
              <label htmlFor="height">Current Height of Pet:</label>
              <input
                type="number"
                name="height"
                placeholder='Height in cm (*Required)'
                id="height"
                className="pet-input-field"
                value={formData.height}
                onChange={handleInputChange}
                required
              />
  
              <label htmlFor="length">Current Length of Pet:</label>
              <input
                type="number"
                name="length"
                placeholder='Lenght in cm (*Required)'
                id="length"
                className="pet-input-field"
                value={formData.length}
                onChange={handleInputChange}
                required
              />
  
              <label htmlFor="width">Current Width of Pet:</label>
              <input
                type="number"
                name="width"
                placeholder='Width in cm (*Required)'
                id="width"
                className="pet-input-field"
                value={formData.width}
                onChange={handleInputChange}
                required
              />

            <label htmlFor="weight">Current weight of Pet:</label>
              <input
                type="number"
                name="weight"
                placeholder='Weight in kg (*Required)'
                id="weight"
                className="pet-input-field"
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
  
              <label htmlFor="petImage">Current Pet Picture:</label>
              <input
                type="file"
                name="petImage"
                id="petImage"
                className="pet-input-field"
                onChange={handleFileUpload}
                required
              />

      
              {/* certified */}
              <div>
              <label>
                <input
                  type="checkbox"
                  name="certified"
                  className='pet-checkbox'
                  onChange={handleCheckboxChange}
                />
                Certified
              </label>
              {formData.certified && (
                <div>
                  <label htmlFor="certificateImage">Upload certificate Photo:</label>
                  <input
                    type="file"
                    name="certificateImage"
                    id="certificateImage"
                    className="pet-input-field"
                    onChange={handleFileUpload}
                    required
                  />
                </div>
              )}

              </div>

             
              
              {/* blood line */}
              <label>
                <input
                  type="checkbox"
                  name="bloodline"
                  className='pet-checkbox'
                  onChange={handleCheckboxChange}
                />
                Want to Enter Blood-line details
              </label>
              {formData.bloodline && (
                <div>
                  <label htmlFor="motherImage">Upload Mother's Photo:</label>
                  <input
                    type="file"
                    name="motherImage"
                    id="motherImage"
                    className="pet-input-field"
                    onChange={handleFileUpload}
                    required
                  />
  
                  <label htmlFor="motherHeight">Mother's Height:</label>
                  <input
                    type="number"
                    name="motherHeight"
                    placeholder='Height in cm (*Required)'
                    id="motherHeight"
                    className="pet-input-field"
                    value={formData.motherHeight}
                    onChange={handleInputChange}
                    required
                  />
  
                  <label htmlFor="motherWeight">Mother's Weight:</label>
                  <input
                    type="number"
                    name="motherWeight"
                    placeholder='Weight in cm (*Required)'
                    id="motherWeight"
                    className="pet-input-field"
                    value={formData.motherWeight}
                    onChange={handleInputChange}
                    required
                  />
  
                  <label htmlFor="fatherImage">Upload Father's Photo:</label>
                  <input
                    type="file"
                    name="fatherImage"
                    id="fatherImage"
                    className="pet-input-field"
                    onChange={handleFileUpload}
                    required
                  />
  
                  <label htmlFor="fatherHeight">Father's Height:</label>
                  <input
                    type="number"
                    name="fatherHeight"
                    placeholder='Height in cm (*Required)'
                    id="fatherHeight"
                    className="pet-input-field"
                    value={formData.fatherHeight}
                    onChange={handleInputChange}
                    required
                  />
  
                  <label htmlFor="fatherWeight">Father's Weight:</label>
                  <input
                    type="number"
                    name="fatherWeight"
                    placeholder='Weight in cm (*Required)'
                    id="fatherWeight"
                    className="pet-input-field"
                    value={formData.fatherWeight}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
  
              {/* {formData.quantity > 1 && (
                <>
                  <br/>
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
              )} */}
              <br/>

                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="In Rupees (*Required)"
                            id="price"
                            className="pet-input-field"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
  
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                placeholder='write description of your pet (Optional)'
                id="description"
                className="pet-input-field"
                value={formData.description}
                onChange={handleInputChange}
              />
  
              <button type="submit" className="pet-submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };

  export default SellerAddPet;