import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "@/redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";
import "../CSS/ChatPage.css"; // Import the CSS file
import LeftSidebar from "./LeftSidebar";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const [showMessages, setShowMessages] = useState(false); // For small screens
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `https://blogging-website-l0oj.onrender.com/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  return (
    <div className="main-container">
      {/* Sidebar showing suggested users */}
      <div className={`chat-sidebar ${showMessages ? "hidden" : ""}`}>
        <section>
          <h1 className="chat-sidebar-header">{user?.username}</h1>
          <hr className="chat-sidebar-divider" />
          <div className="chat-sidebar-list">
            {suggestedUsers.map((suggestedUser) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              return (
                <div
                  key={suggestedUser?._id}
                  onClick={() => {
                    dispatch(setSelectedUser(suggestedUser));
                    setShowMessages(true); // Show chat on small screens
                  }}
                  className="chat-user-item"
                >
                  <Avatar className="chat-avatar">
                    <AvatarImage src={suggestedUser?.profilePicture} />
                    <AvatarFallback>
                      <span>
                        {suggestedUser?.username.slice(0, 2).toUpperCase()}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                  <div className="chat-user-info">
                    <span className="chat-username">
                      {suggestedUser?.username}
                    </span>
                    <span
                      className={`chat-user-status ${
                        isOnline
                          ? "chat-user-status-online"
                          : "chat-user-status-offline"
                      }`}
                    >
                      {isOnline ? "online" : "offline"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Main chat section */}
      <div className={`chat-main-container ${showMessages ? "" : "hidden"}`}>
        {selectedUser ? (
          <section className="chat-main">
            <div className="chat-main-header">
              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                <AvatarFallback>
                  <span>
                    {selectedUser?.username.slice(0, 2).toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{selectedUser?.username}</span>
              </div>
              <Button
                onClick={() => setShowMessages(false)} // Back button on small screens
                className="back-button"
              >
                Back
              </Button>
            </div>
            <Messages selectedUser={selectedUser} />
            <div className="chat-input-container">
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type="text"
                className="chat-input focus-visible:ring-transparent"
                placeholder="Messages..."
              />
              <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
                Send
              </Button>
            </div>
          </section>
        ) : (
          <div className="chat-empty-state">
            <MessageCircleCode className="chat-empty-icon" />
            <h1 className="chat-empty-text">Your messages</h1>
            <span>Send a message to start a chat.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
