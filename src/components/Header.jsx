import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { selectUser } from '../app/features/userSlice';

const Header = () => {
  const user = useSelector(selectUser);
  const [search, setSearch] = useState('');

  return (
    <div className='fixed flex justify-between w-screen z-50 h-12 px-3 py-2 border-b shadow-sm rounded-mmd bg-white z-50'>
      <div className='flex items-center'>
        <p className='text-sm '>{user?.companyName}</p>
      </div>
      <div>
        <label className='flex gap-1 items-center pl-2 border rounded-mmd min-w-[300px] md:w-[420px] bg-gray-100'>
          <HiSearch className='text-gray-600 text-base' />
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
            className='text-xs w-full font-normal py-[6px] placeholder-gray-500 outline-none bg-transparent'
          />
        </label>
      </div>
      <div className='flex items-center'>
        <img src={user?.image} alt={user?.teamName} className='rounded-full h-8 w-8 mr-2' />
        <p className='text-sm'>{user?.teamName}</p>
      </div>
    </div>
  );
};

export default Header;
