import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser,setUserMessages } from '../redux/slices/userSlice';
import axios from "axios";

function Otheruser({ data }) {
  const dispatch = useDispatch();
const selecteduser = useSelector(state => state.user.selectedUser);''
  function handleOtherVisibleUser(user) {
    dispatch(setSelectedUser(user));
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('chatAppToken');
      if (!token || !selecteduser) {
        return;
      }
      
      console.log("calling for get message");
      console.log(token, "   --   ", selecteduser," select");
      try {
        const response = await axios.get(`http://localhost:5000/message/getMessage/${selecteduser._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log(response.data, "all messages");

        if (response.status === 200) {
          console.log('Messages fetched successfully');
          dispatch(setUserMessages(response.data));
          // You can dispatch an action here to store the fetched messages in your Redux store
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selecteduser]);

  return (
    <div className="flex w-[85%] bg-slate-800 px-3 rounded-lg hover:bg-slate-700 py-1 my-1" onClick={() => handleOtherVisibleUser(data)}>
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src={data.profilePhoto} alt="Profile" />
        </div>
      </div>
      <div className="flex items-center px-5 overflow-hidden">
        {data.fullname.split(' ')[0]}
      </div>
    </div>
  );
}

export default Otheruser;
