import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
// import Admin from './admin/Admin'


import SellerRegister from './seller/SellerRegister'
import Seller from './seller/Seller'
import ErrorPage from './pages/ErrorPage'
import SellerLogin from './seller/SellerLogin'
import Admin from './admin/Admin'
import AdminLogin from './admin/AdminLogin'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Seller/>} errorElement={<ErrorPage/>}/>
      <Route path='/seller/register' element={<SellerRegister/>}/>
      <Route path='/seller/login' element={<SellerLogin/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>

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
