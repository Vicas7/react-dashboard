import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ to, title, number, text, linkText }) => {
  return (
    <div className='p-3 bg-white shadow-md rounded-md w-56 lg:w-72'>
      <div className='border-b'>
        <p className='text-xxs text-gray-500 uppercase font-medium'>{title}</p>
        <h1 className='my-2 text-xl'>{number}</h1>
      </div>
      <div className='flex justify-between mt-3'>
        <p className='text-xxs text-gray-500'>{text}</p>
        <Link to={to} className='text-xxs text-link hover:underline'>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
