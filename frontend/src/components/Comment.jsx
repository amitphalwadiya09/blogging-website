
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import '../CSS/Comment.css'; // Import the CSS file

const Comment = ({ comment }) => {
    return (
        <div className='comment-container'>
            <div className='comment-content'>
                <Avatar>
                    <AvatarImage src={comment?.author?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='comment-author'>
                    {comment?.author.username} 
                    <span className='comment-text'>{comment?.text}</span>
                </h1>
            </div>
        </div>
    )
}

export default Comment;
