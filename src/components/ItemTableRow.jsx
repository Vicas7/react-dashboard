import React, { useState } from 'react';
import moment from 'moment';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { BsCircle, BsCircleHalf } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

const ItemTableRow = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let keys = Object.keys(item);

  return (
    <tr
      className={isHovered ? 'bg-gray-100 cursor-pointer border-b' : 'cursor-pointer border-b group even:bg-slate-50'}
      onClick={() => navigate(pathname.indexOf('products') > -1 ? `${item.id}` : `items/${item.id}`)}
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
        #{}
      </td>
      <td className='table-property'>{moment(item.createdAt).calendar()}</td>
      <td className='table-property'>{item.customer.name}</td>
      <td className='table-property'>${item.total.toFixed(2)}</td>
      <td className='table-property'>
        <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px] capitalize'>
          {item.paymentStatus.toLowerCase() == 'paid' ? <FaCircle fontSize={6} /> : <FaRegCircle />}
          {item.paymentStatus}
        </p>
      </td>
      <td className='table-property'>
        {item.fulfillmentStatus.toLowerCase() === 'fulfilled' ? (
          <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px]'>
            <FaCircle fontSize={8} />
            {item.fulfillmentStatus}
          </p>
        ) : item.fulfillmentStatus.toLowerCase() === 'unfulfilled' ? (
          <p className='flex gap-1 items-center text-xxs text-gray-800 bg-yellow-200 rounded-xl w-fit px-1 py-[1px]'>
            <BsCircle fontSize={8} />
            {item.fulfillmentStatus}
          </p>
        ) : (
          <p className='flex gap-1 items-center text-xxs text-gray-800 bg-cyan-200 rounded-xl w-fit px-1 py-[1px]'>
            <BsCircleHalf fontSize={8} className='-rotate-90' />
            {item.fulfillmentStatus}
          </p>
        )}
      </td>
      <td className='text-xs px-4 py-2 whitespace-nowrap text-left font-light'>
        {item.items === 1 ? `${item.items} item` : `${item.items} items`}
      </td>
    </tr>
  );
};

export default ItemTableRow;
