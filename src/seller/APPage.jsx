import React from 'react'
import APCategoryComponent from './APCategoryComponent'
import './css/APPage.css'
import petfood2 from './assets/petfood2.jpg'
import sellpet from './assets/sellpet.jpg'
import acce2 from './assets/acce2.jpg'
import {useNavigate} from 'react-router-dom';


const APPage = () => {
  const navigate = useNavigate();
  return (
    <div className='catergoies-container'>
      <APCategoryComponent onClick={()=>{navigate('add/product/pet')}} img={sellpet} title='Add Pets' text='Here you can add the pets for sale'/>
      <APCategoryComponent onClick={()=>{navigate('add/product/food')}} img={petfood2} title='Add Pet-Foods' text='Here you can add the pet foods for sale'/>
      <APCategoryComponent onClick={()=>{navigate('add/product/accessorie')}} img={acce2} title='Add Pet-Accesories' text='Here you can add the pet accesories for sale'/>
    </div>
  )
}

export default APPage

