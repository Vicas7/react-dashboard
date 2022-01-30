import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { FileUploader } from 'react-drag-drop-files';
import { BsTrashFill } from 'react-icons/bs';

const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG'];

const modules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'color'],
    [{ align: [false, 'center', 'right'] }],
    ['link', { list: 'ordered' }, { list: 'bullet' }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const NewProduct = () => {
  const [status, setStatus] = useState('draft');
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');

  const uploader = useRef();

  const { quill, quillRef } = useQuill({ modules });

  const handleDragIn = useCallback((ev) => {
    console.log(ev);
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.dataTransfer.items && ev.dataTransfer.items.length !== 0) {
      console.log(true);
    }
  }, []);
  const handleDragOut = useCallback((ev) => {
    console.log(ev);
    ev.preventDefault();
    ev.stopPropagation();
    console.log(false);
  }, []);

  useEffect(() => {
    const ele = uploader.current;
    console.log(ele);
    ele.addEventListener('dragenter', handleDragIn);
    ele.addEventListener('dragleave', handleDragOut);
    return () => {
      ele.removeEventListener('dragenter', handleDragIn);
      ele.removeEventListener('dragleave', handleDragOut);
    };
  }, []);

  const handleFilesChange = (file) => {
    setFiles((prev) => [...prev, file]);
  };

  return (
    <div className='p-6 bg-gray-50 min-h-[calc(100vh-3rem)]'>
      <div className='mx-auto max-w-[736px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className='flex items-center h-8 w-8 justify-center border text-gray-700 border-gray-400 rounded-mmd'>
              <Link to={'/admin/orders'} className='p-2'>
                <HiOutlineArrowLeft />
              </Link>
            </div>

            <h3 className='font-medium'>Add product</h3>
          </div>
          {/* <div>
            <p className='text-xs text-gray-800'>Edit</p>
          </div> */}
        </div>
      </div>
      <div className='flex my-6 gap-4 justify-center'>
        <div className='flex-1 max-w-[500px]'>
          <div className='bg-white shadow-md rounded-md mb-4 p-4'>
            <label htmlFor='title' className='text-xs font-light'>
              Title
            </label>
            <input
              type='text'
              id='title'
              className='block mt-1 mb-3 w-full text-xs px-2 py-[6px] rounded-mmd ring-1 ring-gray-300 placeholder-gray-500'
              placeholder='Short sleeve t-shirt'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='description' className='text-xs font-light'>
              Description
            </label>
            <div ref={quillRef} className='rounded-b-mmd !border-gray-300'></div>
          </div>

          <div className='bg-white shadow-md rounded-md p-4 mb-4'>
            <h5 className='text-sm font-medium mb-3'>Media</h5>
            <div className='flex gap-2 flex-wrap '>
              {files.map((file) => (
                <div className='h-28 w-28  border border-gray-300 rounded-md relative group'>
                  <img src={URL.createObjectURL(file)} alt='product-pic' className='w-full h-full object-contain' />
                  <div className='hidden absolute top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-80 rounded-md group-hover:flex justify-center items-center'>
                    <div className='p-2 cursor-pointer'>
                      <BsTrashFill fontSize={16} color='red' />
                    </div>
                  </div>
                </div>
              ))}
              <div className='w-full' ref={uploader}>
                <FileUploader
                  name='file'
                  hoverTitle={true}
                  handleChange={handleFilesChange}
                  types={fileTypes}
                  classes='w-full'
                  children={
                    files.length == 0 ? (
                      <div className='flex flex-col gap-1 justify-center items-center h-20  cursor-pointer border border-dashed border-gray-300 hover:border-blue-700 hover:bg-gray-50 rounded-mmd'>
                        <div className='text-xxs px-1 py-[1px] bg-blue-100 text-blue-700 rounded-mmd'>Add file</div>
                        <p className='text-xxs font-light text-gray-500'>Accepts images and gifs</p>
                      </div>
                    ) : (
                      <div className='flex flex-col gap-1 justify-center items-center w-28 h-28 cursor-pointer border border-dashed border-gray-300 hover:border-blue-700 hover:bg-gray-50 rounded-mmd'>
                        <div className='text-xxs px-1 py-[1px] bg-blue-100 text-blue-700 rounded-mmd'>Add file</div>
                      </div>
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className='bg-white shadow-md rounded-md p-4 mb-4'>
            <h5 className='text-sm font-medium mb-3'>Pricing</h5>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <label htmlFor='price' className='text-xs font-light'>
                  Price
                </label>
                <div className='flex items-center w-full text-xs px-2 mt-1 rounded-mmd text-gray-500 font-light ring-1 ring-gray-300 placeholder-gray-500'>
                  $
                  <input
                    type='text'
                    id='price'
                    className='mr-2 block w-full py-[6px] text-xs outline-none placeholder-gray-500'
                    placeholder='0.00'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex-1'>
                <label htmlFor='price' className='text-xs font-light'>
                  Compare at price
                </label>
                <div className='flex items-center w-full text-xs px-2 mt-1 rounded-mmd text-gray-500 font-light ring-1 ring-gray-300 placeholder-gray-500'>
                  $
                  <input
                    type='text'
                    id='price'
                    className='mr-2 block w-full py-[6px] text-xs outline-none placeholder-gray-500'
                    placeholder='0.00'
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white shadow-md rounded-md min-w-[220px] max-w-[240px] h-max'>
          <div className='p-4 border-b'>
            <h5 className='text-sm font-medium mb-4'>Product status</h5>

            <select
              name='status'
              value={status}
              className='text-xs ring-1 ring-gray-300  shadow-sm rounded-sm w-full p-1 mb-2'
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='draft'>Draft</option>
              <option value='active'>Active</option>
            </select>
            {status === 'draft' ? (
              <p className='text-xs font-light text-gray-500 '>This product will be hidden.</p>
            ) : (
              <p className='text-xs font-light text-gray-500'>This product will be available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
