import { Navbar, Main, Product, Footer } from "../components";
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './../redux/action';
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);


  return (
    <>
      <Navbar />
      <Main />
      <Product  />
    </>
  )
}

export default Home