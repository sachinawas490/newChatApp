import React, { useEffect, useState } from "react";
import Otheruser from "./Otheruser";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import { setOtherUser, setUserMessages, setNewMessage } from '../redux/slices/userSlice';
import { setSocket } from '../redux/slices/socketSlice';
import { IoReorderThreeOutline } from "react-icons/io5";
import SignOut from "./SignOut";

function Sidebar() {
  const [clicked, setclicked] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.otherUsers);
  const authUser = useSelector(state => state.user.authUser);
  
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('chatAppToken');
        const response = await axios.post("http://localhost:5000/user/otherUser", {}, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        dispatch(setOtherUser(response.data.users));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    let socket;
    try {
      if (authUser) {
        socket = io('http://localhost:5000', {
          query: {
            userId: authUser._id
          }
        });

        dispatch(setSocket(socket));

        socket.on('newMessage', (newMessage) => {
         
          dispatch(setNewMessage(newMessage));
        });
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [authUser, dispatch]);

  return (
    <div className={`my-3 h-[96vh] relative  items-center bg-slate-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-cyan-500 ${clicked ? 'w-[8%]' : 'w-[28%]'}`}>
      <div className="flex w-[95%] justify-start items-center h-[50px]">
        <button onClick={() => setclicked(!clicked)}><IoReorderThreeOutline className="text-[35px] ml-2 text-center" /></button>
      </div>
      <div className="my-5 h-[2px] w-full bg-slate-600"></div>
      <div className={`w-[100%] flex flex-col items-center overflow-auto ${clicked ? 'hidden' : 'visible'}`}>
        {users?.length > 0 ? (
          users.map((val, index) => <Otheruser data={val} key={index} user={val} />)
        ) : (
          <p>No users found</p>
        )}
      </div>
    <div className="absolute flex items-center left-2 bottom-8"><SignOut/> <div className={`${clicked ? 'hidden' : 'visible'}`}>SignOut</div></div>
      
      
    </div>
  );
}

export default Sidebar;
