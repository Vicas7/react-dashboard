import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import productImage from '../assets/product-placeholder.jpg';

const ProductTableRow = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <tr
      className={isHovered ? 'bg-gray-100 cursor-pointer border-b' : 'cursor-pointer border-b group even:bg-slate-50'}
      onClick={() => navigate(pathname.indexOf('products') > -1 ? `${item._id}` : `items/${item._id}`)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <td
        className={
          isHovered
            ? 'w-10 bg-gray-100 sticky left-0 table-property font-normal'
            : 'w-10 bg-white group-even:bg-slate-50 sticky left-0 table-property font-normal '
        }
      >
        <div className='w-9 h-9 border rounded-mmd'>
          {item?.images[0]?.url ? (
            <img className='w-full h-full object-contain' src={item?.images[0]?.url} alt={item?.images[0]?.name} />
          ) : (
            <img className='w-full h-full object-contain' src={productImage} alt='product-pic' />
          )}
        </div>
      </td>
      <td className='table-property font-normal'>{item.title}</td>

      <td className='table-property'>{item.active ? 'Active' : 'Draft'}</td>
      <td className='table-property'>{item?.variants?.length || 0}</td>
    </tr>
  );
};

export default ProductTableRow;
