import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import { FileUploader } from 'react-drag-drop-files';
import { nanoid } from 'nanoid';

import 'quill/dist/quill.snow.css';

import { HiOutlineArrowLeft } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';

import { ProductOptions } from '..';
import { storage } from '../../config/firebase';

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
  const [hasOptions, setHasOptions] = useState(false);
  const [options, setOptions] = useState([{ name: '', values: [{ name: '', price: '', comparePrice: '' }] }]);

  const { quill, quillRef } = useQuill({ modules });

  const navigate = useNavigate();

  const handleFilesChange = async (file) => {
    const id = nanoid();
    try {
      await storage.ref('images/' + id).put(file);
      const url = await storage.ref('images').child(id).getDownloadURL();
      setFiles((prev) => [...prev, { name: id, url }]);
    } catch (error) {
      alert(error);
    }
  };

  const removeFile = async (name) => {
    try {
      await storage.ref('images/' + name).delete();
      setFiles((prev) => prev.filter((file) => file.name !== name));
    } catch (error) {
      alert(error);
    }
  };

  const saveProduct = async () => {
    const body = {
      title,
      description: quill.root.innerHTML,
      price,
      comparePrice,
      images: files,
      active: status === 'draft' ? false : true,
      options: hasOptions,
      variants: options[0].name != '' ? options : null,
    };

    var headers = new Headers();
    headers.append('key', 'd11805cb-8f9b-4dfa-b758-5005d9d5cb38');
    headers.append('Content-Type', 'application/json');

    console.log(body);

    const res = await fetch('http://localhost:5050/products', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    if (data.error) alert(data.error);
    else navigate('../products');
  };

  return (
    <div className='p-6 bg-gray-50 min-h-[calc(100vh-3rem)]'>
      <div className='mx-auto max-w-[736px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <div className='flex items-center h-8 w-8 justify-center border text-gray-700 border-gray-400 rounded-mmd'>
              <Link to={'/admin/products'} className='p-2'>
                <HiOutlineArrowLeft />
              </Link>
            </div>

            <h3 className='font-medium'>Add Product</h3>
          </div>
          <button className='btn-primary' onClick={saveProduct}>
            Save
          </button>
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
                <div key={file.name} className='h-28 w-28  border border-gray-300 rounded-md relative group'>
                  <img src={file.url} alt='product-pic' className='w-full h-full object-contain' />
                  <div className='hidden absolute top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-80 rounded-md group-hover:flex justify-center items-center'>
                    <div className='p-2 cursor-pointer'>
                      <BsTrashFill fontSize={16} color='red' onClick={removeFile(file.name)} />
                    </div>
                  </div>
                </div>
              ))}
              <div className='w-full'>
                <FileUploader
                  name='file'
                  handleChange={handleFilesChange}
                  types={fileTypes}
                  classes={
                    files.length == 0
                      ? 'flex flex-col gap-1 justify-center items-center h-20  cursor-pointer border border-dashed border-gray-300 hover:border-blue-700 hover:bg-gray-50 rounded-mmd'
                      : 'flex flex-col gap-1 justify-center items-center w-28 h-28 cursor-pointer border border-dashed border-gray-300 hover:border-blue-700 hover:bg-gray-50 rounded-mmd'
                  }
                  children={
                    files.length == 0 ? (
                      <>
                        <div className='text-xxs px-1 py-[1px] bg-blue-100 text-blue-700 rounded-mmd'>Add file</div>
                        <p className='text-xxs font-light text-gray-500'>Accepts images and gifs</p>
                      </>
                    ) : (
                      <div className='text-xxs px-1 py-[1px] bg-blue-100 text-blue-700 rounded-mmd'>Add file</div>
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
                    className='ml-1 block w-full py-[6px] text-xs outline-none placeholder-gray-500 text-black'
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
                    className='ml-1 block w-full py-[6px] text-xs outline-none placeholder-gray-500 text-black'
                    placeholder='0.00'
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <ProductOptions options={options} setOptions={setOptions} hasOptions={hasOptions} setHasOptions={setHasOptions} />
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
