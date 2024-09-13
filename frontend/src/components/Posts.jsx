// import React from "react";
// import Post from "./Post";
// import { useSelector } from "react-redux";

// const Posts = () => {
//   const { posts } = useSelector((store) => store.post);
//   return (
//     <div>
//       {posts.map((post) => (
//         <Post key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default Posts;

import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import "../CSS/Posts.css"; // Import the new CSS file

const Posts = () => {
  const { posts } = useSelector((store) => store.post);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post key={post._id} post={post} className="post" />
      ))}
    </div>
  );
};

export default Posts;
