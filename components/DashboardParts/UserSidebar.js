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
                        <li className="nav-link">
                            <a href="/UserDashboard">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">DataCollage</span>
                            </a>
                        </li>
                        <li className="dropdown-container">
                            <a className="hover-dropdown-button">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Data</span>
                            </a>
                            <div className="dropdown-menu">
                                <a href="/UserDashboard/AddData" className="p-item">Add Data</a>
                                <a href="/UserDashboard/EditeData" className="p-item">Edite Data</a>
                                <a href="/UserDashboard/DeleteData" className="p-item">Delete Data</a>
                            </div>
                        </li>
                        <li className="dropdown-container">
                            <a className="hover-dropdown-button">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Problem</span>
                            </a>
                            <div className="dropdown-menu">
                                <a href="/UserDashboard/AllProblem" className="p-item">All Problem</a>
                                <a href="/UserDashboard/AddProblem" className="p-item">Add Problem</a>
                                <a href="/UserDashboard/EditeProblem" className="p-item">Edite Problem</a>
                                <a href="/UserDashboard/DeleteProblem" className="p-item">Delete Problem</a>
                            </div>
                        </li>
                        <li className="nav-link">
                            <a href="/UserDashboard/SolvedProblem">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Problem Solved</span>
                            </a>
                        </li>
                        {/* Add more list items for navigation links */}
                    </ul>
                </div>
                <div className="bottom-content">
                    <li className="redhover">
                        <a href="/">
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
