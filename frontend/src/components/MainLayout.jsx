// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import LeftSidebar from './LeftSidebar'

// const MainLayout = () => {
//   return (
//     <div>
//          <LeftSidebar/>
//         <div>
//             <Outlet/>
//         </div>
//     </div>
//   )
// }

// export default MainLayout

import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import '../CSS/MainLayout.css';

const MainLayout = () => {
  return (
    <div className="container">
      <LeftSidebar className="left-sidebar"/>
      <div className="main-content">
        <Outlet/>
      </div>
      {/* <RightSidebar className="right-sidebar"/> */}
    </div>
  );
};

export default MainLayout;
