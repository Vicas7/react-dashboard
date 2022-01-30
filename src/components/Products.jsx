import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ItemTable from './ItemTable';

const activeTabStyle =
  'relative cursor-pointer text-xs px-3 py-2 before:content[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:rounded-t-md before:bg-green-700 hover:before:bg-gray-400';
const notActiveTabStyle =
  'relative cursor-pointer text-xs text-gray-500 hover:text-black px-3 py-2 before:content[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:rounded-t-md hover:before:bg-gray-400';

const headers = [{ title: '' }, { title: 'Product' }, { title: 'Status' }, { title: 'Variants' }];

const Products = () => {
  const [status, setStatus] = useState(null);
  const [filter, setFilter] = useState('');
  const [isFilterFocused, setIsFilterFocused] = useState(false);

  return (
    <div className='p-6 bg-gray-50'>
      <div className='flex justify-between items-center'>
        <h3 className='font-medium'>Products</h3>
        <Link to='new' className='btn-primary'>
          Add product
        </Link>
      </div>

      <div className='bg-white shadow-md rounded-md my-6'>
        <div className='p-2 pb-0 border-b flex gap-2'>
          <p className={!status ? activeTabStyle : notActiveTabStyle} onClick={() => setStatus(null)}>
            All
          </p>
          <p className={status === 'active' ? activeTabStyle : notActiveTabStyle} onClick={() => setStatus('active')}>
            Active
          </p>
          <p className={status === 'draft' ? activeTabStyle : notActiveTabStyle} onClick={() => setStatus('draft')}>
            Draft
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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onFocus={() => setIsFilterFocused(true)}
              onBlur={() => setIsFilterFocused(false)}
              placeholder='Filter products'
              className='text-xs w-full font-normal py-[6px] placeholder-gray-500 outline-none bg-transparent'
            />
          </label>
        </div>

        <ItemTable headers={headers} filter={filter} />
      </div>
    </div>
  );
};

export default Products;
