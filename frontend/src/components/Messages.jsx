

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGetRTM from "@/hooks/useGetRTM";
import "../CSS/Messages.css"; // Importing the new CSS file

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="messages-container">
      <div className="profile-section">
        <div className="profile-info">
          <Avatar className="profile-avatar">
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>
              <span>{selectedUser?.username.slice(0, 2).toUpperCase()}</span>
            </AvatarFallback>
          </Avatar>
          <span className="profile-username">{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="profile-button" variant="secondary">
              View profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="messages">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderId === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`message-bubble ${
                  msg.senderId === user?._id
                    ? "message-sent"
                    : "message-received"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
