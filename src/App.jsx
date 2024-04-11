import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
// import Admin from './admin/Admin'


import SellerRegister from './seller/SellerRegister'
import Seller from './seller/Seller'
import ErrorPage from './pages/ErrorPage'
import SellerLogin from './seller/SellerLogin'
import Admin from './admin/Admin'
import AdminLogin from './admin/AdminLogin'
import APPage from './seller/APPage';
import SellerAddPet from './seller/SellerAddPet';
import SellerAddFood from './seller/SellerAddFood';
import SellerAddAccessories from './seller/SellerAddAccessories';
import SellerManagePetComponent from './seller/SellerManagePetComponent';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<div><h1>Home</h1></div>} errorElement={<ErrorPage/>}/> 
      <Route path='/seller' element={<Seller/>}>
          <Route path='' element={<APPage/>}/>
          <Route path='add/product/pet' element={<SellerAddPet/>}/>
          <Route path='add/product/food' element={<SellerAddFood/>}/>
          <Route path='add/product/accessorie' element={<SellerAddAccessories/>}/>
          <Route path='manage/pet' element={<SellerManagePetComponent/>}/>

      </Route>
      <Route path='/seller/register' element={<SellerRegister/>}/>
      <Route path='/seller/login' element={<SellerLogin/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>

      </>
    )
  )

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}/>
      {/* <Admin/> */}
    </>
  )
}

export default App
