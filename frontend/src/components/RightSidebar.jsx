
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";
import "../CSS/RightSidebar.css";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className="right-sidebar">
        <div className="right-sidebar-content">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${user?._id}`}>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="post_image" />
                <AvatarFallback>
                  <span>{user?.username.slice(0, 2).toUpperCase()}</span>
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="font-semibold text-sm">
                <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
              </h1>
              <span className="text-gray-600 text-sm">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <SuggestedUsers />
        </div>
      </div>
      <div className="afterMedia">
        <span className="hippo flex flex-col items-center">
          <i
            className="fa-solid fa-dragon hippo"
            style={{ fontSize: "2rem" }}
          ></i>
        </span>
        <div className="heading">FlickFeed</div>
        <div>
          <Link to="/suggestions" className="right-sidebar-icon">
            <i class="fa-brands fa-medium"></i> {/* Use an appropriate icon */}
          </Link>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
