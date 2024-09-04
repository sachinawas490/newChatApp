import React, { useEffect } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';


function useGetMessages() {
    const selectedUser = useSelector(store => store.user.selectedUser);
    useEffect(() => {
        const fetchMessage = async() => {
          try {
              const response = await axios.get(`http:localhost:5000/user/getMessage/${selectedUser._id}`);
              console.log(response.data, "  response");
          } catch (error) {
              console.log(error);
          }
        }
        fetchMessage();
    }, []);
}

export default useGetMessages;
