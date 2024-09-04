import React from 'react'
import Sidebar from './Sidebar'
import Message from './Message'
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Home() {
 
  const { authUser } = useSelector(state => state.user);
 
 
  return (
    <div className='flex justify-center h-screen p-3 box-border'>
      <Sidebar></Sidebar>
      <Message></Message>
    </div>
  )
}

export default Home
