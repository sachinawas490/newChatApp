import React from "react";
import InputComp from "./InputComp";
import MessageBox from "./MessageBox";
import { useSelector } from "react-redux";
import SignOut from "./SignOut";
import useGetMessages from "../config/useGetMessages";
import { FaRocketchat } from "react-icons/fa";

function Message() {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  useGetMessages();

  if (!selectedUser) {
    return (
      <div
        className="flex box-border justify-center items-center h-[98%] py-2 flex-col flex-grow my-4 mx-2 bg-slate-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-cyan-500"
      >

        <FaRocketchat className="text-[130px]" />
        <div>Chat with Friends with Real time</div>
        <div>with Chat App</div>
      </div>
    );
  }

  return (
    <div
      className="flex box-border h-[98%] py-2 flex-col flex-grow my-4 mx-2 bg-slate-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-cyan-500"
    >
      <div className="w-full h-[60px] bg-slate-700 rounded-t-xl">
        <div className="flex w-[85%] bg-slate-800 px-3 rounded-lg hover:bg-slate-700 py-1 my-1">
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src={`${selectedUser.profilePhoto}`} />
            </div>
          </div>
          <div className="flex items-center px-5">{selectedUser.fullname}</div>
        
        </div>
      </div>
      <MessageBox />
      <InputComp />
    </div>
  );
}

export default Message;
