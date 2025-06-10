/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBox, FiActivity, FiSettings, FiUser } from 'react-icons/fi';
import '../styles/Layout.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Layout = () => {

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/login'); // Redirect to login after logout
    };

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    }

    return (
        <>
            <div className="app-layout">
                <div>
                    <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>

                        {/* Sidebar content will go here later */}
                        <div>
                            {isSidebarExpanded ? <h2 className='title-text'>Federated AI Model Sharing Platform</h2> : <div></div>}
                            <nav className="sidebar-nav">
                                <ul>
                                    <li>
                                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <FiGrid className='nav-icon' />
                                            {isSidebarExpanded && <span className='nav-text'>Dashboard</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/models" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <FiBox className='nav-icon' />
                                            {isSidebarExpanded && <span className='nav-text'>Models</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/training" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <FiActivity className='nav-icon' />
                                            {isSidebarExpanded && <span className='nav-text'>Training</span>}
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                            <FiSettings className='nav-icon' />
                                            {isSidebarExpanded && <span className='nav-text'>Settings</span>}
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <button onClick={toggleSidebar} className='sidebar-toggle-btn '>
                            {isSidebarExpanded ? <FaChevronLeft /> : <FaChevronRight />}
                        </button>
                    </aside>
                </div>
                <div style={{ "width": "100%" }}>

                    <main className="main-content">
                        <div className="main-content-header">
                            <div className='user-controls'>
                                <button className="user-profile-button" aria-label="User menu">
                                    <FiUser />

                                </button>
                                <button className="logout-button" onClick={handleLogout}>Logout</button>
                            </div>


                        </div>

                        <div className="page-content">
                            <Outlet />
                        </div>

                    </main>

                </div>
            </div>
        </>

    )
}

export default Layout