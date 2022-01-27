import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Content from './Content';
import { userData } from '../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../app/features/userSlice';
import Admin from '../components/Admin';
import Orders from '../components/Orders';

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
      <div className='flex'>
        <Sidebar />
        <div className='mt-12 ml-48'>
          <Routes>
            <Route path='/' element={<Admin />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
