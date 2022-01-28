import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import TableRow from './TableRow';

import { orderData } from '../api/orders';

const OrderTable = ({ limit = 0, ordersPerPage, fulfillment }) => {
  const [currentOrders, setCurrentOrders] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [orderOffset, setOrderOffset] = useState(0);

  useEffect(() => {
    let data = orderData;
    if (fulfillment) data = orderData.filter((order) => order.fulfillmentStatus.toLowerCase() === fulfillment);

    const endOffset = orderOffset + ordersPerPage;
    setCurrentOrders(data.slice(orderOffset, endOffset));
    setPageCount(Math.ceil(data.length / ordersPerPage));
  }, [orderOffset, ordersPerPage, fulfillment]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * ordersPerPage) % orderData.length;
    console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`);
    setOrderOffset(newOffset);
  };

  return (
    <>
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
            {currentOrders?.map((order, index) => {
              return (index < limit || !limit) && <TableRow key={index} order={order} />;
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

export default OrderTable;
