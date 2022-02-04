import React from 'react';
const ProductVariants = ({ options, setOptions }) => {
  const changeVariantPrice = (index, vIndex, e) => {
    let optionsValues = [...options];
    optionsValues[index].values[vIndex].price = e.target.value;
    setOptions(optionsValues);
  };
  const changeVariantComparePrice = (index, vIndex, e) => {
    let optionsValues = [...options];
    optionsValues[index].values[vIndex].comparePrice = e.target.value;
    setOptions(optionsValues);
  };

  return (
    <div>
      <div className='bg-white shadow-md rounded-md p-4 mb-4'>
        <h5 className='text-sm font-medium mb-3'>Variants</h5>
        <table className='relative w-full'>
          <thead className='border-b'>
            <tr>
              <th className='sticky bg-white table-header'>Variant</th>
              <th className='table-header'>Price</th>
              <th className='table-header'>Compare price</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option, index) =>
              option?.values.map((value, vIndex) => (
                <tr key={index + vIndex} className='border-b'>
                  <td className='table-property font-medium'>{value.name}</td>
                  <td className='table-property text-center'>
                    <div className='flex items-center w-20 text-xs px-2 mt-1 rounded-mmd text-gray-500 font-light ring-1 ring-gray-300 placeholder-gray-500'>
                      $
                      <input
                        type='text'
                        id='price'
                        className='ml-1 block w-full py-[6px] text-xs outline-none placeholder-gray-500 text-black'
                        placeholder='0.00'
                        value={value.price}
                        onChange={(e) => changeVariantPrice(index, vIndex, e)}
                      />
                    </div>
                  </td>
                  <td className='table-property text-center'>
                    <div className='flex items-center w-20 text-xs px-2 mt-1 rounded-mmd text-gray-500 font-light ring-1 ring-gray-300 placeholder-gray-500'>
                      $
                      <input
                        type='text'
                        id='price'
                        className='ml-1 block w-full py-[6px] text-xs outline-none placeholder-gray-500 text-black'
                        placeholder='0.00'
                        value={value.comparePrice}
                        onChange={(e) => changeVariantComparePrice(index, vIndex, e)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductVariants;
