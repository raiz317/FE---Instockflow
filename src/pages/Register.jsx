import React from "react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/auth.css";

function Register() {
    const navigate = useNavigate();
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

    async function handleSubmit(event) {
        event.preventDefault();

        if (!identity.username || !identity.email || !identity.password) {
            alert("Tolong isi semua kolom formulir!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(identity)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal melakukan registrasi");
            }

            alert("Registrasi sukses! Silakan login.");
            navigate('/login');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="register-container">
            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <h1 className="form-title">InstockFlow</h1>
                    <input
                        type="text"
                        value={identity.username}
                        name="username"
                        placeholder="Enter your username"
                        onChange={handleChange}
                        className="form-input" />
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