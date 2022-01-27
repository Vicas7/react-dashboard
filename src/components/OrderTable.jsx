import React, { useState } from 'react';
import moment from 'moment';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { BsCircleHalf } from 'react-icons/bs';

const OrderTable = ({ orderData }) => {
  const handleHover = (e) => {
    console.log(e);
    const row = e.target.parentNode;
    if (e.type === 'mouseout') {
      row.classList.remove('bg-gray-100');
      row.children[0].classList.remove('bg-gray-100');
      row.children[0].classList.add('bg-white');
    } else {
      row.classList.add('bg-gray-100');
      row.children[0].classList.remove('bg-white');
      row.children[0].classList.add('bg-gray-100');
    }
  };

  return (
    <div className='overflow-x-scroll w-full mt-1'>
      <table className='relative'>
        <thead className='border-b'>
          <tr>
            <th className='fixed bg-white table-header'>Order</th>
            <th className='table-header'>Date</th>
            <th className='table-header'>Customer</th>
            <th className='table-header'>Total</th>
            <th className='table-header'>Payment status</th>
            <th className='table-header'>Fulfillment status</th>
            <th className='table-header'>Items</th>
          </tr>
        </thead>
        <tbody>
          {orderData?.map((order, index) => {
            return (
              index < 10 && (
                <tr key={index} onMouseOver={handleHover} onMouseOut={handleHover}>
                  <td className='sticky bg-white left-0 table-property font-normal'>{order.order}</td>
                  <td className='table-property'>{moment(order.createdAt).calendar()}</td>
                  <td className='table-property'>{order.customer.name}</td>
                  <td className='table-property'>${order.total.toFixed(2)}</td>
                  <td className='table-property'>
                    <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px]'>
                      {order.paymentStatus.toLowerCase() == 'paid' ? <FaCircle fontSize={6} /> : <FaRegCircle />}
                      {order.paymentStatus}
                    </p>
                  </td>
                  <td className='table-property'>
                    <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px]'>
                      {order.fulfillmentStatus.toLowerCase() == 'fulfilled' ? (
                        <FaCircle fontSize={8} />
                      ) : order.fulfillmentStatus.toLowerCase() == 'unfulfilled' ? (
                        <FaRegCircle fontSize={8} />
                      ) : (
                        <BsCircleHalf fontSize={8} className='-rotate-90' />
                      )}
                      {order.fulfillmentStatus}
                    </p>
                  </td>
                  <td className='text-xs px-4 py-2 whitespace-nowrap text-left font-light'>
                    {order.items == 1 ? `${order.items} item` : `${order.items} items`}
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
