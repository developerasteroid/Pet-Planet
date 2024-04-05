import React from 'react'
import APCategoryComponent from './APCategoryComponent'
import './css/APPage.css'
import delta from './assets/delta.png'
import dogimg from './assets/dogimg.jpg'
import unnamed from './assets/unnamed.jpg'


const APPage = () => {
  return (
    <div className='catergoies-container'>
      <APCategoryComponent img={dogimg} title='Add Pets' text='Here you can add the pets for sale'/>
      <APCategoryComponent img={delta} title='Add Pet-Foods' text='Here you can add the pet foods for sale'/>
      <APCategoryComponent img={unnamed} title='Add Pet-Accesories' text='Here you can add the pet accesories for sale'/>
    </div>
  )
}

export default APPage

