import React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/auth.css";

function Login({ setUser }) {
    const navigate = useNavigate();
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

    async function handleSubmit(event) {
        event.preventDefault();

        if (!identity.email || !identity.password) {
            alert("Tolong isi email dan password!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(identity)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal melakukan login");
            }
            if (typeof setUser === "function") {
                setUser(data.user);
            }

            console.log("Navigasi ke dashboard berhasil dipicu!");
            navigate('/dashboard');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="login-container">
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <h1 className="form-title">InstockFlow</h1>
                    <input
                        type="email"
                        value={identity.email}
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className="form-input" />
                    <input
                        type="password"
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