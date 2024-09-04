import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function MessageBox() {
  const messages = useSelector(state => state.user.userMessages);
  const selectedUser = useSelector(state => state.user.selectedUser);

  // Ref to scroll to the last message
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 px-3 overflow-auto">
      {messages?.map((msg) => (
        <div
          key={msg._id}
          className={`chat ${msg.senderId === selectedUser._id ? 'chat-start' : 'chat-end'}`}
        >
          <div className="chat-bubble">
            {msg.message}
          </div>
        </div>
      ))}
      {/* Empty div at the end to act as the scroll target */}
      <div ref={endOfMessagesRef} />
    </div>
  );
}

export default MessageBox;
