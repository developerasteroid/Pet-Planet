import React, { useState } from 'react'
import './css/SellerManagePetComponent.css'

const SellerManagePetComponent = (props) => {
  const [isChanged, setisChanged] = useState(false);

  const [data, setdata] = useState({
    Quantity: props.Quantity,
    Price: props.Price
  })

  const handleInputChange =(e)=>{
    setisChanged(true);
    const {name, value} = e.target;
    setdata({...data, [name]: value});
  }
  return (
   <div className='ManagePet-MainContainer'>

      <div className="ManagePet-container">

        <div className='ManagePet-name'>
          Pet: <div className='ManagePet-field'>
          {props.petName}
        </div>
        </div>

        <div className='ManagePet-name'>
          Breed: <div className='ManagePet-field'>props.petBreed</div>
        </div>

        <div className='ManagePet-name'>
          Image: <div className='ManagePet-field'>props.petImage</div>
        </div>

        <div className='ManagePet-name'>
          Breed: <div className='ManagePet-field'>props.petBreed</div>
        </div>

        <div>
        <div className='ManagePet-name'>Gender: <div className='ManagePet-field'>props.gender</div></div>
         <div className='ManagePet-name'>Quantity: <div><input 
         type="number" 
         className='ManagePet-field'
         name='Quantity'
         id='Quantity'
         value={data.Quantity}
         onChange={handleInputChange}
         /></div></div> 
        </div>

        <div>
        <div>Gender: <div>props.gender</div></div>
         <div>Quantity: <div><input 
         type="number" 
         className='ManagePet-field'
         name='Quantity'
         id='Quantity'
         value={data.Quantity}
         onChange={handleInputChange}
         /></div></div> 
        </div>

        <div>
          <div className='ManagePet-name'>Price:
            <input 
            type="number"
            className='ManagePet-filed' 
            name='Price'
            id='Price'
            value={data.Price}
            onChange={handleInputChange}
         />
         </div>
         </div> 

         {isChanged && <button>
            Save changes
         </button>}

      </div>
   </div>
  )
}

export default SellerManagePetComponent
