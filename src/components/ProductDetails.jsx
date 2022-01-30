import React, { useEffect, useState } from 'react';
import { BsCircle, BsCircleHalf } from 'react-icons/bs';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';

import { orderData } from '../api/orders';

const ProductDetails = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const filtered = orderData.filter((o) => o.id == orderId);
    setOrder(filtered[0]);
  }, [orderId]);

  return (
    <div className='p-6 bg-gray-50 min-h-[calc(100vh-3rem)]'>
      <div className='mx-auto max-w-[736px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className='flex items-center h-8 w-8 justify-center border text-gray-700 border-gray-400 rounded-mmd'>
              <Link to={'/admin/orders'} className='p-2'>
                <HiOutlineArrowLeft />
              </Link>
            </div>

            {order && (
              <>
                <h3 className='font-medium'>#{order.order}</h3>
                <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px] capitalize'>
                  {order.paymentStatus.toLowerCase() == 'paid' ? <FaCircle fontSize={6} /> : <FaRegCircle />}
                  {order.paymentStatus}
                </p>
                {order.fulfillmentStatus.toLowerCase() === 'fulfilled' ? (
                  <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px]'>
                    <FaCircle fontSize={8} />
                    {order.fulfillmentStatus}
                  </p>
                ) : order.fulfillmentStatus.toLowerCase() === 'unfulfilled' ? (
                  <p className='flex gap-1 items-center text-xxs text-gray-800 bg-yellow-200 rounded-xl w-fit px-1 py-[1px]'>
                    <BsCircle fontSize={8} />
                    {order.fulfillmentStatus}
                  </p>
                ) : (
                  <p className='flex gap-1 items-center text-xxs text-gray-800 bg-cyan-200 rounded-xl w-fit px-1 py-[1px]'>
                    <BsCircleHalf fontSize={8} className='-rotate-90' />
                    {order.fulfillmentStatus}
                  </p>
                )}
              </>
            )}
          </div>
          <div>
            <p className='text-xs text-gray-800'>Edit</p>
          </div>
        </div>
      </div>
      <div className='flex my-6 gap-4 justify-center'>
        <div className='flex-1 max-w-[520px]'>
          <div className='bg-white shadow-md rounded-md mb-4'>
            <div className='p-4 border-b'>
              <h5 className='text-sm font-medium mb-4 '>{order?.fulfillmentStatus}</h5>

              <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                  <img
                    src='https://cdn.shopify.com/s/files/1/0514/8740/8304/products/0DF15E1E-4CB3-4BFF-BA57-F8D4FD9B328F_1_160x160.jpg?v=1609714818'
                    alt='product-pic'
                    className='h-8 w-8 border rounded-md'
                  />
                  <div>
                    <Link to='productId' className='underline text-blue-700 text-xs'>
                      Custom One Line Digital Only
                    </Link>
                  </div>
                </div>
                <p className='text-xs text-gray-700'>${order?.total.toFixed(2)}</p>
              </div>
            </div>
            <div className='flex justify-end p-4 gap-2'>
              <button
                className='btn-primary bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800'
                disabled={
                  order?.fulfillmentStatus.toLowerCase() === 'in progress' ||
                  order?.fulfillmentStatus.toLowerCase() === 'fulfilled'
                }
              >
                In Progress
              </button>
              <button className='btn-primary' disabled={order?.fulfillmentStatus.toLowerCase() === 'fulfilled'}>
                Fulfill item
              </button>
            </div>
          </div>
          <div className='bg-white shadow-md rounded-md'>
            <div className='p-4 border-b'>
              <h5 className='text-sm font-medium mb-4 capitalize'>{order?.paymentStatus}</h5>

              <div className='flex justify-between items-center'>
                <p className='text-xs text-gray-800'>Subtotal</p>
                <p className='text-xs text-gray-800'>${order?.total.toFixed(2)}</p>
              </div>
              <div className='flex justify-between items-center mt-1'>
                <p className='text-xs text-gray-800 font-medium'>Total</p>
                <p className='text-xs text-gray-800 font-medium'>${order?.total.toFixed(2)}</p>
              </div>
            </div>
            <div className='flex justify-between items-center p-4'>
              <p className='text-xs text-gray-800 '>Paid by customer</p>
              <p className='text-xs text-gray-800 '>${order?.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-md rounded-md min-w-[200px] max-w-[220px]'>
          <div className='p-4 border-b'>
            <h5 className='text-sm font-medium mb-4'>Customer</h5>

            <Link to='customerId' className='underline text-blue-700 text-xs'>
              {order?.customer?.name} {order?.customer?.lastname}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
