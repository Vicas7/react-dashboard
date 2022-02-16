import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DiscountTableRow = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <tr
      className={isHovered ? 'bg-gray-100 cursor-pointer border-b' : 'cursor-pointer border-b group even:bg-slate-50'}
      onClick={() => navigate(pathname.indexOf('discounts') > -1 ? `${item._id}` : `discounts/${item._id}`)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <td
        className={
          isHovered
            ? ' bg-gray-100 sticky left-0 table-property font-normal'
            : 'bg-white group-even:bg-slate-50 sticky left-0 table-property font-normal '
        }
      >
        {item.code}
      </td>
      <td className='table-property'>{item.isPercentage ? 'Percentage' : 'Fixed amount'}</td>
      <td className='table-property'>{item.active ? 'Active' : 'Draft'}</td>
      <td className='table-property'>{item?.value}</td>
    </tr>
  );
};

export default DiscountTableRow;
