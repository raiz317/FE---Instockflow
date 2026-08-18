import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import inves from '../assets/inves.png';
import live from '../assets/live.png';
import suppliers from '../assets/suppliers.png';

function Home() {
    return (
        <div>
            <nav>
                <div>
                    <h1>InstockFlow</h1>
                </div>
                <div>
                    <Link to="/login" className="login btn">Login</Link>
                    <Link to="/register" className="register btn">Register</Link>
                </div>
            </nav>
            <div className="heading">
                <h1>Mastering Our Inventory, Simply</h1>
                <p>Effective Control and Seamless Supplier Integration</p>
            </div>
            <div className="content">
                <div className="box">
                    <div className="icon-box bg-blue-light">
                        <img src={inves} alt="Real-Time Visibility"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        </img>
                    </div>
                    <h5 className="card-title">Comprehensive Internal Asset & Data Overview</h5>
                    <p className="card-text">Gain complete visibility into the health of your operations. This dashboard
                        automatically calculates Total Products, Total Suppliers, and Total Asset Value, providing a
                        solid data foundation for all management decisions.
                    </p>
                </div>
                <div className="box">
                    <div className="icon-box bg-orange-light">
                        <img src={live} alt="Real-Time Visibility"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        </img>
                    </div>
                    <h5 className="card-title">Critical Stock Monitoring & Real-Time Alerts</h5>
                    <p className="card-text">Ensure stock availability is maintained. The system automatically
                        identifies low-stock items and presents a list of products approaching the minimum level,
                        allowing the team to react quickly before operations are disrupted.
                    </p>
                </div>
                <div className="box">
                    <div className="icon-box bg-purple-light">
                        <img src={suppliers} alt="Real-Time Visibility"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        </img>
                    </div>
                    <h5 className="card-title">Seamless Product & Supplier Administration</h5>
                    <p className="card-text">Manage your internal database with an efficient system. Manage your product
                        directory and supplier database in a single, integrated platform to ensure data accuracy and
                        speed up operational administration.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;