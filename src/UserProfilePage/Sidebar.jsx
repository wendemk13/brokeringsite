import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [user_id,setuser_id]=useState();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user")); 
 if (!user || !user.id) {
                    console.error('User ID not found');
                    return;
                }
                                const id = user.id; 
                                setuser_id(id);

    },[])

    return (
        <div className="sidebar" id="sidebar">
            <div className="logo">
                <span className="logo-icon">🏠</span>
                <span>BrokerPro</span>
            </div>
            
            <a href="#" className="nav-item active">
                <i>📊</i>
                <span>Dashboard</span>
            </a>
            <a href="#" className="nav-item">
                <i>🚗</i>
                <span>Listings</span>
            </a>
            <a href="#" className="nav-item">
                <i>💬</i>
                <span>Messages</span>
            </a>
            <Link to={`/UserTransactions/${user_id}`} className="nav-item">
                <i>💬</i>
                <span>User Transactions</span>
            </Link>
            <a href="#" className="nav-item">
                <i>📈</i>
                <span>Analytics</span>
            </a>
            <a href="#" className="nav-item">
                <i>⚙️</i>
                <span>Settings</span>
            </a>
        </div>
    );
};

export default Sidebar;