import React from 'react'
import APCategoryComponent from './APCategoryComponent'
import './css/APPage.css'
import delta from './assets/delta.png'
import dogimg from './assets/dogimg.jpg'
import unnamed from './assets/unnamed.jpg'
import {useNavigate} from 'react-router-dom';


const APPage = () => {
  const navigate = useNavigate();
  return (
    <div className='catergoies-container'>
      <APCategoryComponent onClick={()=>{navigate('add/product/pet')}} img={dogimg} title='Add Pets' text='Here you can add the pets for sale'/>
      <APCategoryComponent onClick={()=>{navigate('add/product/food')}} img={delta} title='Add Pet-Foods' text='Here you can add the pet foods for sale'/>
      <APCategoryComponent onClick={()=>{navigate('add/product/accessorie')}} img={unnamed} title='Add Pet-Accesories' text='Here you can add the pet accesories for sale'/>
    </div>
  )
}

export default APPage

