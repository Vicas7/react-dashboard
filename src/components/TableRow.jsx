import React, { useState } from 'react';
import moment from 'moment';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { BsCircle, BsCircleHalf } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const TableRow = ({ order }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <tr
      className={isHovered ? 'bg-gray-100 cursor-pointer border-b' : 'cursor-pointer border-b group even:bg-slate-50'}
      onClick={() => navigate(`orders/${order.order}`)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <td
        className={
          isHovered
            ? 'bg-gray-100 sticky left-0 table-property font-normal'
            : 'bg-white group-even:bg-slate-50 sticky left-0 table-property font-normal'
        }
      >
        {order.order}
      </td>
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
      </td>
      <td className='text-xs px-4 py-2 whitespace-nowrap text-left font-light'>
        {order.items === 1 ? `${order.items} item` : `${order.items} items`}
      </td>
    </tr>
  );
};

export default TableRow;
