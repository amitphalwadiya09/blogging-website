

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import "../CSS/Profile.css"; // Ensure this CSS file is correct

const Profile = () => {
  const { id: userId } = useParams();
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = userProfile?.followers.includes(user?._id);

  const handleTabChange = (tab) => setActiveTab(tab);

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="grid grid-cols-2">
          <section className="avatar-section">
            <Avatar className="avatar">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt={
                  userProfile?.username
                    ? `${userProfile.username}'s profile picture`
                    : "Profile"
                }
              />
              <AvatarFallback>
                <span>{userProfile?.username.slice(0, 2).toUpperCase()}</span>
              </AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button variant="secondary" className="button">
                        Edit profile
                      </Button>
                    </Link>
                    <Button variant="secondary" className="button">
                      View archive
                    </Button>
                    <Button variant="secondary" className="button">
                      Ad tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button variant="secondary" className="button">
                      Unfollow
                    </Button>
                    <Button variant="secondary" className="button">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button className="follow-button">Follow</Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts.length || 0}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers.length || 0}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following.length || 0}
                  </span>{" "}
                  following
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here..."}
                </span>
                <Badge className="w-fit" variant="secondary">
                  <AtSign />{" "}
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
              </div>
            </div>
          </section>
        </div>
        <div className="tab-nav">
          <span
            className={`py-3 cursor-pointer ${
              activeTab === "posts" ? "active-tab" : ""
            }`}
            onClick={() => handleTabChange("posts")}
          >
            POSTS
          </span>
          <span
            className={`py-3 cursor-pointer ${
              activeTab === "saved" ? "active-tab" : ""
            }`}
            onClick={() => handleTabChange("saved")}
          >
            SAVED
          </span>
          
        </div>
        <div className="posts-grid">
          {displayedPost?.map((post) => (
            <div key={post?._id} className="relative group cursor-pointer">
              <img
                src={post.image}
                alt={post?.description || "Post image"}
                className="post-image"
              />
              <div className="post-overlay">
                <div className="flex items-center text-white space-x-4">
                  <button className="flex items-center gap-2">
                    <Heart />
                    <span>{post?.likes.length}</span>
                  </button>
                  <button className="flex items-center gap-2">
                    <MessageCircle />
                    <span>{post?.comments.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
