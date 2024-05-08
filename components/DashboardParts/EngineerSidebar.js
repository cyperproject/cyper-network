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
                            <a href="/EngineerDashboard">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">All Problems</span>
                            </a>
                        </li>
                        <li className="dropdown-container">
                            <a className="hover-dropdown-button">
                                <i className="icon"><BiHome /></i>
                                <span className="text nav-text">Solving</span>
                            </a>
                            <div className="dropdown-menu">
                                <a href="/EngineerDashboard/AllSolve" className="p-item">Solved problems</a>
                                <a href="/EngineerDashboard/AddSolve" className="p-item">Add Solve</a>
                                <a href="/EngineerDashboard/EditeSolve" className="p-item">Edite Solve</a>
                                <a href="/EngineerDashboard/DeleteSolve" className="p-item">Delete Solve</a>
                            </div>
                        </li>
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
