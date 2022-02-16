import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';

import { HiOutlineArrowLeft } from 'react-icons/hi';

const NewDiscount = () => {
  const [status, setStatus] = useState('false');
  const [code, setCode] = useState('');
  const [value, setValue] = useState('');
  const [isPercentage, setIsPercentage] = useState(true);

  const navigate = useNavigate();

  const saveProduct = async () => {
    var headers = new Headers();
    headers.append('key', 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38');
    headers.append('Content-Type', 'application/json');

    const res = await fetch('http://localhost:5050/discounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        key: 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38',
      },
      body: JSON.stringify({
        code,
        value,
        isPercentage,
        active: status,
      }),
    });
    const data = await res.json();
    if (data.error) alert(data.error);
    else navigate('../discounts');
  };

  return (
    <div className='p-6 bg-gray-50 min-h-[calc(100vh-3rem)]'>
      <div className='mx-auto max-w-[736px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className='flex items-center h-8 w-8 justify-center border text-gray-700 border-gray-400 rounded-mmd'>
              <Link to={-1} className='p-2'>
                <HiOutlineArrowLeft />
              </Link>
            </div>

            <h3 className='font-medium'>Create Discount</h3>
          </div>
          <button className='btn-primary' onClick={saveProduct}>
            Save
          </button>
        </div>
      </div>
      <div className='flex my-6 gap-4 justify-center'>
        <div className='flex-1 max-w-[500px]'>
          <div className='bg-white shadow-md rounded-md mb-4 p-4'>
            <label htmlFor='title' className='text-sm font-medium'>
              Discount code
            </label>
            <input
              type='text'
              id='title'
              className='block mt-2 mb-3 w-full text-xs px-2 py-[6px] rounded-mmd ring-1 ring-gray-300 placeholder-gray-500'
              placeholder='e.g. CHRISTMAS10'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className='bg-white shadow-md rounded-md p-4 mb-4'>
            <h5 className='text-sm font-medium mb-3'>Type</h5>
            <div className='flex w-full items-center mb-2'>
              <input type='radio' name='type' id='percentage' checked={isPercentage} onClick={() => setIsPercentage(true)} />
              <label htmlFor='percentage' className='text-xs ml-2 font-light'>
                Percentage
              </label>
            </div>
            <div className='flex w-full items-center mb-2'>
              <input type='radio' name='type' id='fixed' checked={!isPercentage} onClick={() => setIsPercentage(false)} />
              <label htmlFor='fixed' className='text-xs ml-2 font-light'>
                Fixed amount
              </label>
            </div>
          </div>

          <div className='bg-white shadow-md rounded-md p-4 mb-4'>
            <h5 className='text-sm font-medium mb-3'>Value</h5>
            <div>
              <label htmlFor='value' className='text-xs font-light'>
                Discount value
              </label>
              <input
                type='text'
                id='value'
                className='block mt-1 mb-3 w-32 text-xs px-2 py-[6px] rounded-mmd ring-1 ring-gray-300 placeholder-gray-500'
                placeholder='10'
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='bg-white shadow-md rounded-md min-w-[220px] max-w-[240px] h-max'>
          <div className='p-4 border-b'>
            <h5 className='text-sm font-medium mb-4'>Product status</h5>

            <select
              name='status'
              value={status}
              className='text-xs ring-1 ring-gray-300  shadow-sm rounded-sm w-full p-1 mb-2'
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='false'>Draft</option>
              <option value='true'>Active</option>
            </select>
            {status === 'true' ? (
              <p className='text-xs font-light text-gray-500'>This product will be active.</p>
            ) : (
              <p className='text-xs font-light text-gray-500 '>This discount won't be active.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDiscount;
