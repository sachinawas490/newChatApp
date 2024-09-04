import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserMessages } from '../redux/slices/userSlice';
import { IoSendOutline } from "react-icons/io5";

function InputComp() {
  const { socket } = useSelector(state => state.socket);
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState('');
  const selectedUser = useSelector(state => state.user.selectedUser);
  const { authUser, userMessages } = useSelector(state => state.user);

  async function handleClick() {
    const token = localStorage.getItem('chatAppToken');

    if (!token || !selectedUser || !messageText.trim() || !authUser) {
      return;
    }

    try {
      const message = {
        receiverId: selectedUser._id,
        message: messageText,
        senderId: authUser._id
      };

      socket.emit('privateMessage', message);

      // Dispatch action to update messages
      dispatch(setUserMessages([...userMessages, message]));

      // Clear the message input after sending
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  return (
    <div className="relative mx-auto w-[70%] my-3">
      <input
        name='message'
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        type="text"
        className="bg-slate-700 w-full h-[33px] hover:border-2 hover:border-slate-950 px-3 rounded-xl  pr-16"
        placeholder='Enter your Message'
      />
      <IoSendOutline
        onClick={handleClick} 
        className='absolute top-2 right-3 text-slate=100'
      >
        Send
      </IoSendOutline>
    </div>
  );
}

export default InputComp;
