import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CustomerTableRow = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <tr
      className={isHovered ? 'bg-gray-100 cursor-pointer border-b' : 'cursor-pointer border-b group even:bg-slate-50'}
      onClick={() => navigate(pathname.indexOf('customers') > -1 ? `${item._id}` : `items/${item._id}`)}
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
        {item.firstName} {item.lastName}
      </td>
      <td className='table-property font-normal normal-case'>{item.email}</td>
      <td className='table-property'>{item?.orders?.length || 0}</td>
    </tr>
  );
};

export default CustomerTableRow;
