import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/SellerAddPet.css';

const SellerAddPet = () => {
    const [formData, setFormData] = useState({
      petType: '',
      petBreed:'',
      age: '',
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
  
    const handleSubmit = (e) => {
      e.preventDefault();

      const isConfirmed = window.confirm('Are you sure you want sell this product');

      if (isConfirmed) {
        console.log('Form submitted successfully!');
        console.log('Form Data:', formData);
      } else {
        console.log('Form submission cancelled.');
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
  
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                name="age"
                placeholder='Age in months (*Required)'
                id="age"
                className="pet-input-field"
                value={formData.age}
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
                    placeholder='Enter male quantity (*Required)'
                    id="maleQuantity"
                    className="pet-input-field"
                    value={formData.maleQuantity}
                    onChange={handleInputChange}
                    required
                  />
  
                  <label htmlFor="femaleQuantity">Female Quantity:</label>
                  <input
                    type="number"
                    name="femaleQuantity"
                    placeholder='Enter female quantity (*Required)'
                    id="femaleQuantity"
                    className="pet-input-field"
                    value={formData.femaleQuantity}
                    onChange={handleInputChange}
                    required
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
