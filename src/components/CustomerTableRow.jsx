import React, { useState } from 'react';
import moment from 'moment';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import { BsCircle, BsCircleHalf } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomerTableRow = ({ item }) => {
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
        <img src={item?.images[0]} alt='photo' />
      </td>
      <td className='table-property'>{item.title}</td>
      <td className='table-property'>{item.status ? 'Active' : 'Draft'}</td>
      <td className='table-property'>{item?.variants?.length}</td>
    </tr>
  );
};

export default CustomerTableRow;
