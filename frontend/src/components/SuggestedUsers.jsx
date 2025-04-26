


import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import '../CSS/SuggestedUsers.css'; // Import the CSS file

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        <div className='suggested-container'>
            <div className='suggested-header'>
                <h1 className='suggested-header-title'>Suggested for you</h1>
                <span className='suggested-see-all'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='suggested-user-item'>
                            <div className='suggested-user-info'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback><span>{user?.username.slice(0, 2).toUpperCase()}</span></AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='suggested-user-name'>
                                        <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                                    </h1>
                                    <span className='suggested-user-bio'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span className='follow-button'>Follow</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers;
