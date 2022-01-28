import React from 'react';
import { Link } from 'react-router-dom';

import { BsFillInboxesFill } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import OrderTable from './OrderTable';
import HomeCard from './HomeCard';

const Admin = () => {
  return (
    <div className='w-[calc(100vw-12rem)] h-[calc(100vh-3rem)] p-6 bg-gray-50'>
      <p className='text-xs text-gray-500'>Here's what's happening today.</p>
      <div className='flex justify-between gap-4 w-full my-4'>
        <HomeCard to='analytics' title='Total sales' number='$1340.00' text='25 total orders' linkText='View analytics' />
        <HomeCard to='analytics' title='Total orders' number='25' text='$53,6 AOV' linkText='View analytics' />
        <HomeCard to='analytics' title='Total products' number='39' text='$34,35 APV' linkText='View analytics' />
      </div>

      <Link to='orders' className='flex justify-between items-center p-3 bg-white text-gray-700 shadow-md rounded-md my-6'>
        <div className='flex gap-4'>
          <BsFillInboxesFill />
          <p className='text-sm'>
            <span className='font-medium'>50+ orders</span> to fulfill
          </p>
        </div>
        <MdKeyboardArrowRight />
      </Link>

      <div className='relative bg-white shadow-md rounded-md my-6'>
        <p className='p-3'>Latest orders</p>
        <OrderTable ordersPerPage={10} />
      </div>
    </div>
  );
};

export default Admin;
