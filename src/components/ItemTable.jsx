import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ItemTableRow from './ItemTableRow';

import { orderData } from '../api/orders';

const ItemTable = ({ headers, filters, limit = 0, itemsPerPage = 30 }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    let data = orderData;
    // if (fulfillment) data = orderData.filter((order) => order.fulfillmentStatus.toLowerCase() === fulfillment);

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filters]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % orderData.length;
    console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className='overflow-x-scroll w-full mt-1'>
        <table className='relative w-full'>
          <thead className='border-b'>
            <tr>
              {headers?.map((header, index) => (
                <th key={index} className={index === 0 ? 'fixed bg-white table-header' : 'table-header'}>
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item) => {
              return <ItemTableRow key={item.id} item={item} />;
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        breakLabel=''
        nextLabel='>'
        previousLabel='<'
        renderOnZeroPageCount={null}
        previousLinkClassName='px-[10px] py-[5px] border border-gray-500 text-gray-500 rounded-l-mmd'
        nextLinkClassName='px-[10px] py-[5px] border border-gray-500 text-gray-500 rounded-r-mmd'
        pageClassName='hidden'
        disabledLinkClassName='!border-gray-300 !text-gray-300 cursor-default'
        className='flex justify-center py-5 '
      />
    </>
  );
};

export default ItemTable;
