import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import OrderTable from './OrderTable';

const activeTabStyle =
  'relative cursor-pointer text-xs px-3 py-2 before:content[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:rounded-t-md before:bg-green-700 hover:before:bg-gray-400';
const notActiveTabStyle =
  'relative cursor-pointer text-xs text-gray-500 hover:text-black px-3 py-2 before:content[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:rounded-t-md hover:before:bg-gray-400';

const Orders = () => {
  const [filter, setFilter] = useState({ fulfillment: null, search: '' });
  const [isFilterFocused, setIsFilterFocused] = useState(false);

  return (
    <div className='p-6 bg-gray-50 min-h-[calc(100vh-3rem)]'>
      <div className='max-w-[1000px] m-auto'>
        <h3 className='font-medium'>Orders</h3>

        <div className='bg-white shadow-md rounded-md my-6'>
          <div className='p-2 pb-0 border-b flex gap-2'>
            <p
              className={!filter.fulfillment ? activeTabStyle : notActiveTabStyle}
              onClick={() => setFilter((prev) => ({ ...prev, fulfillment: null }))}
            >
              All
            </p>
            <p
              className={filter.fulfillment === 'unfulfilled' ? activeTabStyle : notActiveTabStyle}
              onClick={() => setFilter((prev) => ({ ...prev, fulfillment: 'unfulfilled' }))}
            >
              Unfulfilled
            </p>
            <p
              className={filter.fulfillment === 'fulfilled' ? activeTabStyle : notActiveTabStyle}
              onClick={() => setFilter((prev) => ({ ...prev, fulfillment: 'fulfilled' }))}
            >
              Fulfilled
            </p>
            <p
              className={filter.fulfillment === 'in progress' ? activeTabStyle : notActiveTabStyle}
              onClick={() => setFilter((prev) => ({ ...prev, fulfillment: 'in progress' }))}
            >
              In progress
            </p>
          </div>
          <div className='my-3 px-3'>
            <label
              className={
                isFilterFocused
                  ? 'flex gap-1 items-center pl-2 border rounded-mmd w-full outline outline-1 outline-blue-500'
                  : 'flex gap-1 items-center pl-2 border rounded-mmd w-full'
              }
            >
              <HiSearch className='text-gray-600 text-base' />
              <input
                type='text'
                value={filter.search}
                onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
                onFocus={() => setIsFilterFocused(true)}
                onBlur={() => setIsFilterFocused(false)}
                placeholder='Filter orders'
                className='text-xs w-full font-normal py-[6px] placeholder-gray-500 outline-none bg-transparent'
              />
            </label>
          </div>

          <OrderTable filter={filter} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
