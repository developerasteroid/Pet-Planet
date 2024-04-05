import './App.css'
import SellerRegister from './seller/SellerRegister'
// import Admin from './admin/Admin'
import Seller from './seller/Seller'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Seller/>}/>
      <Route path='/signup' element={<SellerRegister/>}/>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router}/>
      {/* <Admin/> */}
    </>
  )
}

export default App
