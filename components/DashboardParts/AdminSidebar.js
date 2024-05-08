import React from 'react';
import './style.css'; // Import your CSS file
import logo from './logo.jpg'; // Import your logo image
import Image from 'next/image';
import { BiHome, BiSearch, BiLogOut, BiChevronRight } from 'react-icons/bi';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <header>
                <div className="image-text">
                    <span className="image">
                        <Image src={logo} width={40}  alt="logo" />
                    </span>
                    <div className="text header-text">
                        <span className="name">Cyper</span>
                    </div>
                </div>
                <i className='toggle'><BiChevronRight /></i>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-link">
                        <li className="dropdown-container">
                            <a className="hover-dropdown-button">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Users</span>
                            </a>
                            <div className="dropdown-menu">
                                <a href="/AdminDashboard/Users/Admins" className="p-item">Admins</a>
                                <a href="/AdminDashboard/Users/Users" className="p-item">Users</a>
                                <a href="/AdminDashboard/Users/Engineers" className="p-item">Engineers</a>
                            </div>
                        </li>
                        <li className="nav-link">
                            <a href="/AdminDashboard/AddUser">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Add user</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="/AdminDashboard/ChangeRoles">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Change Role</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="/AdminDashboard/DeleteRoles">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Delete Role</span>
                            </a>
                        </li>
                        {/* Add more list items for navigation links */}
                    </ul>
                </div>
                <div className="bottom-content">
                    <li className="redhover">
                        <a href="#">
                            <i className="icon"><BiLogOut /></i>
                            <span className="text nav-text">Logout</span>
                        </a>
                    </li>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
