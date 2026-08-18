import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import "../styles/auth.css";

function Register() {
    const [identity, setIdentity] = useState({
        username: "",
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
        <div className="register-container">
            <div className="form-card">
                <form>
                    <h1 className="form-title">InstockFlow</h1>
                    <input
                        // type="email"
                        value={identity.username}
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        className="form-input" />
                    <input
                        // type="email"
                        value={identity.email}
                        name="email"
                        placeholder="Enter your email"
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
                        Register
                    </button>

                    <div className="footer-links">
                        <p>Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;