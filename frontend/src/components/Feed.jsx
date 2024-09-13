// import React from 'react'
// import Posts from './Posts'

// const Feed = () => {
//   return (
//     <div className='flex-1 my-8 flex flex-col items-center pl-[20%]'>
//         <Posts/>
//     </div>
//   )
// }

// export default Feed

import React from 'react';
import Posts from './Posts';
import '../CSS/Feed.css';

const Feed = () => {
  return (
    <div className='feed'>
      <Posts/>
    </div>
  );
};

export default Feed;
