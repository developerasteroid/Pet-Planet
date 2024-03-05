import React from 'react'
import delta from './assets/delta.png'
import './css/APCategoryComponent.css'

const APCategoryComponent = () => {
  return (
             <div className="category-container">

                    <div className="category-img">
                        <img src={delta} alt="" className='img' />
                    </div>

                    <div className="category-name">
                        Add

                    </div>
            </div>
     
  )
}

export default APCategoryComponent
