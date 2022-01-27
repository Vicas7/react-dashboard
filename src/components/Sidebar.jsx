import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import { BsFillInboxesFill, BsHouseDoorFill } from 'react-icons/bs';
import { IoPerson, IoSettingsSharp } from 'react-icons/io5';
import { GoGraph } from 'react-icons/go';
import { AiFillTag } from 'react-icons/ai';
import { FaPercentage } from 'react-icons/fa';

const SidebarOption = ({ to, Icon, title }) => {
  // const match = useMatch(to);
  // console.log(match);
  const isActiveStyle = 'flex gap-2 bg-gray-100 text-green-700 px-2 py-1 mx-2 rounded-mmd mb-1';
  const isNotActiveStyle = 'flex gap-2 px-2 py-1 mx-2 rounded-sm mb-1';
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
      <Icon />
      <p className='text-[12px] font-medium'>{title}</p>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div className='fixed top-12 flex flex-col justify-between w-48 h-[calc(100vh-3em)] py-2 bg-gray-50 text-gray-700 border-r '>
      <div className=''>
        <SidebarOption to='/admin' Icon={BsHouseDoorFill} title='Home' />
        <SidebarOption to='orders' Icon={BsFillInboxesFill} title='Orders' />
        <SidebarOption to='products' Icon={AiFillTag} title='Products' />
        <SidebarOption to='customers' Icon={IoPerson} title='Customers' />
        <SidebarOption to='analytics' Icon={GoGraph} title='Analytics' />
        <SidebarOption to='discounts' Icon={FaPercentage} title='Discounts' />
      </div>
      <div>
        <SidebarOption to='admin/settings' Icon={IoSettingsSharp} title='Settings' />
      </div>
    </div>
  );
};

export default Sidebar;
