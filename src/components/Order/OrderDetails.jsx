import React, { useEffect, useState } from 'react';
import { BsCircle, BsCircleHalf } from 'react-icons/bs';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';

import productImage from '../../assets/product-placeholder.jpg';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      const res = await fetch(`http://localhost:5050/orders/${orderId}`, {
        headers: {
          key: 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38',
        },
      });
      const order = await res.json();
      console.log(order);
      setOrder(order);
    };
    getOrder();
  }, [orderId]);

  const handleFulfillmentButton = async (e) => {
    try {
      await fetch(`http://localhost:5050/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          key: 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38',
        },
        body: JSON.stringify({
          fulfillmentStatus: e.target.value,
        }),
      });
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='p-6 bg-gray-50 min-h-[calc(100vh-3rem)]'>
      <div className='mx-auto max-w-[850px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className='flex items-center h-8 w-8 justify-center border text-gray-700 border-gray-400 rounded-mmd'>
              <Link to={-1} className='p-2'>
                <HiOutlineArrowLeft />
              </Link>
            </div>

            {order && (
              <>
                <h3 className='font-medium'>#{order?.orderNumber}</h3>
                <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px] capitalize'>
                  {order?.paymentStatus?.toLowerCase() == 'paid' ? <FaCircle fontSize={6} /> : <FaRegCircle />}
                  {order?.paymentStatus}
                </p>
                {order?.fulfillmentStatus.toLowerCase() === 'fulfilled' ? (
                  <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px] capitalize'>
                    <FaCircle fontSize={8} />
                    {order?.fulfillmentStatus}
                  </p>
                ) : order?.fulfillmentStatus?.toLowerCase() === 'unfulfilled' ? (
                  <p className='flex gap-1 items-center text-xxs text-gray-800 bg-yellow-200 rounded-xl w-fit px-1 py-[1px] capitalize'>
                    <BsCircle fontSize={8} />
                    {order?.fulfillmentStatus}
                  </p>
                ) : (
                  <p className='flex gap-1 items-center text-xxs text-gray-800 bg-cyan-200 rounded-xl w-fit px-1 py-[1px] capitalize'>
                    <BsCircleHalf fontSize={8} className='-rotate-90' />
                    {order?.fulfillmentStatus}
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
        <div className='flex-1 max-w-[600px]'>
          <div className='bg-white shadow-md rounded-md mb-4'>
            <div className='p-4 border-b'>
              <h5 className='text-sm font-medium mb-4 capitalize'>{order?.fulfillmentStatus}</h5>
              {order?.products.map((product, index) => (
                <div key={product._id} className='flex justify-between items-center mb-2'>
                  <div className='flex gap-4'>
                    <div className='h-8 w-8 border rounded-md'>
                      <img
                        src={product?.images[0]?.url ? product?.images[0]?.url : productImage}
                        alt='product-pic'
                        className='w-full h-full object-contain'
                      />
                    </div>
                    <div>
                      <Link to={`/admin/products/${product._id}`} className='underline text-blue-700 text-xs'>
                        {product.title}
                      </Link>
                    </div>
                  </div>
                  <p className='text-xs text-gray-700'>${product?.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className='flex justify-end p-4 gap-2'>
              <button
                className='btn-primary bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800'
                disabled={
                  order?.fulfillmentStatus.toLowerCase() === 'in progress' ||
                  order?.fulfillmentStatus.toLowerCase() === 'fulfilled'
                }
                value='in progress'
                onClick={handleFulfillmentButton}
              >
                In Progress
              </button>
              <button
                className='btn-primary'
                disabled={order?.fulfillmentStatus.toLowerCase() === 'fulfilled'}
                value='fulfilled'
                onClick={handleFulfillmentButton}
              >
                Fulfill item
              </button>
            </div>
          </div>
          <div className='bg-white shadow-md rounded-md'>
            <div className='p-4 border-b'>
              <h5 className='text-sm font-medium mb-4 capitalize'>{order?.paymentStatus}</h5>

              <div className='flex justify-between items-center'>
                <p className='text-xs text-gray-800'>Subtotal</p>
                <p className='text-xs text-gray-800'>${order?.subtotal.toFixed(2)}</p>
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

        <div className='bg-white shadow-md rounded-md min-w-[200px] max-w-[250px] h-max'>
          <div className='p-4 border-b'>
            <h5 className='text-sm font-medium mb-4'>Customer</h5>

            <Link to={`/admin/customers/${order?.customer._id}`} className='underline text-blue-700 text-xs'>
              {order?.customer?.firstName} {order?.customer?.lastName}
            </Link>
          </div>
          <div className='p-4 border-b'>
            <h6 className='text-xxs font-medium uppercase'>Contact information</h6>
            <a href={`mailto:${order?.customer?.email}`} className='text-xs font-light text-blue-700 hover:underline'>
              {order?.customer?.email}
            </a>
          </div>
          <div className='p-4 '>
            <h6 className='text-xxs font-medium uppercase mb-2'>Shipping address</h6>
            <p className='text-xs font-light '>
              {order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}
            </p>
            <p className='text-xs font-light '>
              {order?.shippingAddress?.address1} {order?.shippingAddress?.address2}
            </p>
            <p className='text-xs font-light '>
              {order?.shippingAddress?.city} {order?.shippingAddress?.zipCode}
            </p>
            <p className='text-xs font-light '>{order?.customer?.shippingAddress?.country}</p>
            {order?.shippingAddress?.phone && <p className='text-xs font-light '>{order?.shippingAddress?.phone}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
