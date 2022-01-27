import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import axios from 'axios';

import { userData } from '../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../app/features/userSlice';
import { Header, Sidebar, Admin, Orders, Products, Customers, Analytics, Discounts } from '../components';

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
          <Route path='/orders' element={<Orders />} />
          <Route path='/products' element={<Products />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/discounts' element={<Discounts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
