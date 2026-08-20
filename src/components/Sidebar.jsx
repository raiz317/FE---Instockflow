import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';
import Instockflow from '../assets/Instockflow.jpg';
import IconProfil from '../assets/icon.png'

function Sidebar(props) {
    const { user, onLogout } = props;
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoutClick = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div className="sidebar-container">
            <div className="sidebar-brand">
                <h4>
                    <img src={Instockflow} alt="Logo Web" />InStockFlow
                </h4>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <Link
                            className={`sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                            to="/dashboard"
                        >
                            <i className="bi bi-grid-1x2"></i> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`sidebar-link ${location.pathname === '/products' ? 'active' : ''}`}
                            to="/products"
                        >
                            <i className="bi bi-box"></i> Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`sidebar-link ${location.pathname === '/suppliers' ? 'active' : ''}`}
                            to="/suppliers"
                        >
                            <i className="bi bi-people"></i> Suppliers
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="user-dropdown">
                    <button className="dropdown-toggle-btn" type="button">
                        <img
                            src={IconProfil}
                            className="profile-avatar"
                            alt="profile"
                        />
                        <span className="user-name">{props.user || "User"}</span>
                    </button>

                    <ul className="dropdown-menu-list">
                        <li>
                            <Link className="dropdown-item-link" to="/profile">
                                <i className="bi bi-person"></i> My Profile
                            </Link>
                        </li>
                        <li>
                            <button
                                className="dropdown-item-link text-danger"
                                onClick={handleLogoutClick}
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                            >
                                <i className="bi bi-box-arrow-left"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
