import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/auth.css";

function Login() {
    const [identity, setIdentity] = useState({
        email: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setIdentity(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    return (
        <div className="login-container">
            <div className="form-card">
                <form>
                    <h1 className="form-title">InstockFlow</h1>
                    <input
                        // type="email"
                        value={identity.email}
                        name="email"
                        placeholder="Enter your email or username"
                        onChange={handleChange}
                        className="form-input" />
                    <input
                        // type="password"
                        value={identity.password}
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        className="form-input" />

                    <button type="submit" className="form-button">
                        Login
                    </button>

                    <div className="footer-links">
                        <p>Don't have an account? <Link to="/register" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;