import React, { useState } from 'react';
import moment from 'moment';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { BsCircle, BsCircleHalf } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderTableRow = ({ order }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <tr
      className={isHovered ? 'bg-gray-100 cursor-pointer border-b' : 'cursor-pointer border-b group even:bg-slate-50'}
      onClick={() =>
        navigate(
          pathname.indexOf('orders') > -1
            ? `${order._id}`
            : pathname.indexOf('orders') > -1
            ? `orders/${order._id}`
            : `/admin/orders/${order._id}`
        )
      }
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
        #{order.orderNumber}
      </td>
      <td className='table-property'>{moment(order.createdAt).calendar()}</td>
      <td className='table-property'>
        {order?.customer?.firstName} {order?.customer?.lastName}
      </td>
      <td className='table-property'>${order.total.toFixed(2)}</td>
      <td className='table-property'>
        <p className='flex gap-1 items-center text-xxs text-gray-800 bg-gray-300 rounded-xl w-fit px-1 py-[1px] capitalize'>
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
        {order?.products?.length === 1 ? `${order.products.length} item` : `${order.products.length} items`}
      </td>
    </tr>
  );
};

export default OrderTableRow;
