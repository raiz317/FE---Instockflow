import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
            backgroundColor: '#f8fafc',
            color: '#1e293b',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '72px', margin: '0', color: '#ef4444' }}>404</h1>
            <h2 style={{ fontSize: '24px', margin: '10px 0' }}>Halaman Tidak Ditemukan</h2>
            <p style={{ color: '#64748b', marginBottom: '20px', maxWidth: '400px' }}>
                Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan ke rute lain.
            </p>
            <button
                onClick={() => navigate('/dashboard')}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
                Kembali ke Dashboard
            </button>
        </div>
    );
}

export default NotFound;
