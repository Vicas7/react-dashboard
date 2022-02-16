import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { BsFillInboxesFill } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import OrderTable from './Order/OrderTable';
import HomeCard from './HomeCard';

const Admin = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      const url = new URL('http://localhost:5050/orders/date');
      const res = await fetch(url, {
        headers: {
          key: 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38',
        },
      });
      const data = await res.json();
      console.log(data);
      setInfo(data);
    };
    getInfo();
  }, []);

  return (
    <div className='w-[calc(100vw-12rem)] h-[calc(100vh-3rem)] p-6 bg-gray-50'>
      <div className='max-w-[1000px] m-auto'>
        <p className='text-xs text-gray-500'>Here's what's happening today.</p>
        <div className='flex justify-between gap-4 w-full my-4'>
          <HomeCard
            to='analytics'
            title='Total sales'
            number={info?.revenue ? `$${info?.revenue}` : <p className='text-xs font-light text-gray-600'>No sales yet</p>}
            text={`${info?.numberOfOrders || '0'} total orders`}
            linkText='View analytics'
          />
          <HomeCard
            to='analytics'
            title='Total orders'
            number={info?.numberOfOrders || <p className='text-xs font-light text-gray-600'>No sales yet</p>}
            text={`$${info?.AOV?.toFixed(2) || '0'} AOV`}
            linkText='View analytics'
          />
          <HomeCard
            to='analytics'
            title='Total products'
            number={info.numberOfProductsSold || <p className='text-xs font-light text-gray-600'>No sales yet</p>}
            text={`$${(info?.revenue / info?.numberOfProductsSold)?.toFixed(2) || '0'} APV`}
            linkText='View analytics'
          />
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
          <OrderTable itemsPerPage={10} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
