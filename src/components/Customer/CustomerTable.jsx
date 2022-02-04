import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import CustomerTableRow from './CustomerTableRow';

const CustomerTable = ({ headers, filter, itemsPerPage = 30 }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const getCustomers = async () => {
      const url = new URL('http://localhost:5050/customers');
      if (filter.search !== '') {
        url.searchParams.set('search', filter.search);
      }

      const res = await fetch(url, {
        headers: {
          key: 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38',
        },
      });
      const data = await res.json();
      console.log(data);
      setCurrentItems(data);
      setPageCount(Math.ceil(data.length / itemsPerPage));
    };
    getCustomers();
  }, [itemOffset, itemsPerPage, filter]);

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
              {headers?.map((header, index) => (
                <th key={index} className={index === -1 ? 'fixed bg-white table-header' : 'table-header'}>
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item) => (
              <CustomerTableRow key={item?._id} item={item} />
            ))}
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

export default CustomerTable;
