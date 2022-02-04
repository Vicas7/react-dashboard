import React, { useState } from 'react';
import { BsPlusLg, BsTrashFill } from 'react-icons/bs';
import ProductVariants from './ProductVariants';

const ProductOptions = ({ options, setOptions, hasOptions, setHasOptions, setHasChanged = () => {} }) => {
  const handleOptionsChange = (index, vIndex, e) => {
    let optionsValues = [...options];
    if (e.target.name === 'name') {
      optionsValues[index].name = e.target.value;
    } else {
      optionsValues[index].values[vIndex].name = e.target.value;
    }
    setOptions(optionsValues);
  };

  const removeOption = (index) => {
    let optionsValues = [...options];
    optionsValues.splice(index, 1);
    setOptions(optionsValues);
  };

  const addValueToOption = (index) => {
    let optionsValues = [...options];
    optionsValues[index].values.push({ name: '', price: '', comparePrice: '' });
    setOptions(optionsValues);
  };

  const removeValueToOption = (index, vIndex) => {
    let optionsValues = [...options];
    optionsValues[index].values.splice(vIndex, 1);
    setOptions(optionsValues);
  };
  return (
    <>
      <div className='bg-white shadow-md rounded-md p-4 mb-4'>
        <h5 className='text-sm font-medium mb-3'>Options</h5>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='options'
            checked={hasOptions}
            onChange={() => {
              setHasOptions((hasOptions) => !hasOptions);
              setHasChanged(true);
            }}
          />
          <label htmlFor='options' className='text-xs font-light'>
            This product has options
          </label>
        </div>
        {hasOptions &&
          options?.map((option, index) => (
            <div key={index} className='border-t my-2 '>
              <label className='text-xs font-light '>Option name</label>
              <div className='flex items-center gap-4 mt-1 mb-3'>
                <div className='flex-1 '>
                  <input
                    type='text'
                    name='name'
                    className='block  w-full text-xs px-2 py-[6px] rounded-mmd ring-1 ring-gray-300 placeholder-gray-500'
                    placeholder='Name'
                    value={option.name || ''}
                    onChange={(e) => {
                      handleOptionsChange(index, null, e);
                      setHasChanged(true);
                    }}
                  />
                </div>
                {index > 0 && <BsTrashFill className='text-gray-500 cursor-pointer' onClick={() => removeOption(index)} />}
              </div>
              <label className='text-xs font-light'>Option values</label>
              {option?.values.map((value, vIndex) => (
                <div key={vIndex} className='flex items-center gap-4 mt-1 mb-3'>
                  <div className='flex-1 '>
                    <input
                      type='text'
                      name='values'
                      key={vIndex}
                      className='block w-full text-xs px-2 py-[6px] rounded-mmd ring-1 ring-gray-300 placeholder-gray-500'
                      placeholder='Value'
                      value={value.name}
                      onChange={(e) => {
                        handleOptionsChange(index, vIndex, e);
                        setHasChanged(true);
                      }}
                    />
                  </div>
                  {vIndex > 0 && (
                    <BsTrashFill className='text-gray-500 cursor-pointer' onClick={() => removeValueToOption(index, vIndex)} />
                  )}
                  <BsPlusLg className='text-gray-500 cursor-pointer' onClick={() => addValueToOption(index)} />
                </div>
              ))}
            </div>
          ))}
      </div>
      {hasOptions && <ProductVariants options={options} setOptions={setOptions} />}
    </>
  );
};

export default ProductOptions;
