import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import CustomerDetailOrderTable from './CustomerDetailOrderTable';

const CustomerDetails = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [registered, setRegistered] = useState(false);
  const [orders, setOrders] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  const navigate = useNavigate();
  const { customerId } = useParams();

  useEffect(() => {
    const getCustomer = async () => {
      const res = await fetch(`http://localhost:5050/customers/${customerId}`, {
        headers: {
          key: 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38',
        },
      });
      const data = await res.json();
      console.log(data);

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setRegistered(data.registered);
      setOrders(data.orders);
    };
    getCustomer();
  }, [customerId]);

  const saveProduct = async () => {
    const body = {
      firstName,
      lastName,
      email,
    };

    var headers = new Headers();
    headers.append('key', 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38');
    headers.append('Content-Type', 'application/json');

    console.log(body);

    const res = await fetch(`http://localhost:5050/customers/${customerId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.error) alert(data.error);
    else navigate('../products');
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

            <h3 className='font-medium'>
              {firstName} {lastName}
            </h3>
          </div>
          <button className='btn-primary' onClick={saveProduct} disabled={!hasChanged}>
            Save
          </button>
        </div>
      </div>
      <div className='flex my-6 gap-4 justify-center'>
        <div className='flex-1 max-w-[500px]'>
          <div className='bg-white shadow-md rounded-md mb-4 '>
            <div className='flex gap-4 w-full border-b p-4'>
              <div className='flex-1'>
                <label htmlFor='firstName' className='text-xs font-light'>
                  Firstname
                </label>
                <input
                  type='text'
                  id='title'
                  className='block mt-1 mb-3 w-full text-xs px-2 py-[6px] rounded-mmd ring-1 ring-gray-300 placeholder-gray-500'
                  placeholder='Short sleeve t-shirt'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setHasChanged(true);
                  }}
                />
              </div>
              <div className='flex-1'>
                <label htmlFor='lastName' className='text-xs font-light'>
                  Lastname
                </label>
                <input
                  type='text'
                  id='title'
                  className='block mt-1 mb-3 w-full text-xs px-2 py-[6px] rounded-mmd ring-1 ring-gray-300 placeholder-gray-500'
                  placeholder='Short sleeve t-shirt'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setHasChanged(true);
                  }}
                />
              </div>
            </div>
            <CustomerDetailOrderTable orders={orders} />
          </div>
        </div>

        <div className='bg-white shadow-md rounded-md min-w-[220px] max-w-[240px] h-max'>
          <div className='p-4 border-b'>
            <h5 className='text-sm font-medium mb-4'>Customer</h5>
            <a href={`mailto:${email}`} className='text-xs font-light text-blue-700 hover:underline'>
              {email}
            </a>
            {registered ? (
              <p className='text-xs font-light text-gray-500'>Registered</p>
            ) : (
              <p className='text-xs font-light text-gray-500'>No account</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
