import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import axios from 'axios';

import { userData } from '../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../app/features/userSlice';
import {
  Header,
  Sidebar,
  Admin,
  Orders,
  Products,
  Customers,
  Analytics,
  Discounts,
  OrderDetails,
  NewProduct,
  ProductDetails,
  CustomerDetails,
  DiscountDetails,
  NewDiscount,
} from '../components';

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Home useEffect()');
    dispatch(login(userData));
  }, []);

  console.log(user);
  return (
    <div>
      <Header />
      <Sidebar />
      <div className='pt-12 pl-48'>
        <Routes>
          <Route path='/' element={<Admin />} />
          <Route path='orders/' element={<Orders />} />
          <Route path='orders/:orderId' element={<OrderDetails />} />

          <Route path='products' element={<Products />} />
          <Route path='products/:productId' element={<ProductDetails />} />
          <Route path='products/new' element={<NewProduct />} />

          <Route path='customers' element={<Customers />} />
          <Route path='customers/:customerId' element={<CustomerDetails />} />

          <Route path='analytics' element={<Analytics />} />

          <Route path='discounts' element={<Discounts />} />
          <Route path='discounts/:discountId' element={<DiscountDetails />} />
          <Route path='discounts/new' element={<NewDiscount />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
