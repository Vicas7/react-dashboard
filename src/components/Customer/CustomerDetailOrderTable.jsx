import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import OrderTableRow from '../Order/OrderTableRow';

const CustomerDetailOrderTable = ({ itemsPerPage = 10, orders }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setCurrentItems(orders);
    setPageCount(Math.ceil(orders.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, orders]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % currentItems.length;
    console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className='overflow-x-scroll w-full mt-1'>
        <table className='relative w-full'>
          <thead className='border-b'>
            <tr>
              <th className={currentItems.length === 0 ? 'table-header' : 'fixed bg-white table-header'}>Order</th>
              <th className='table-header'>Date</th>
              <th className='table-header'>Customer</th>
              <th className='table-header'>Total</th>
              <th className='table-header'>Payment status</th>
              <th className='table-header'>Fulfillment status</th>
              <th className='table-header'>Items</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((order, index) => {
              return <OrderTableRow key={order._id} order={order} />;
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

export default CustomerDetailOrderTable;
