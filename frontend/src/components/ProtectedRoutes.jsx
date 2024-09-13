// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoutes = ({children}) => {
//     const {user} = useSelector(store=>store.auth);
//     const navigate = useNavigate();
//     useEffect(()=>{
//         if(!user){
//             navigate("/login");
//         }
//     },[])
//   return <>{children}</>
// }

// export default ProtectedRoutes;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../CSS/ProtectedRoutes.css'; // Import the CSS file

const ProtectedRoutes = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            setLoading(false); // Stop loading if user is authenticated
        }
    }, [user, navigate]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-message">Redirecting to login...</div>
            </div>
        );
    }

    return <>{children}</>;
}

export default ProtectedRoutes;