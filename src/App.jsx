import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Suppliers from './pages/Suppliers.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOptions = {
    credentials: 'include'
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/users/me', fetchOptions)
      .then(res => {
        if (!res.ok) throw new Error("Belum login atau session habis");
        return res.json();
      })
      .then(userData => {
        setUser(userData);

        return Promise.all([
          fetch('http://localhost:3000/api/products', fetchOptions).then(res => res.json()),
          fetch('http://localhost:3000/api/suppliers', fetchOptions).then(res => res.json())
        ]);
      })
      .then(([productsData, suppliersData]) => {
        if (productsData && !productsData.message) setProducts(productsData);
        if (suppliersData && !suppliersData.message) setSuppliers(suppliersData);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, [user]);

  const handleLogout = () => {
    fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      ...fetchOptions
    })
      .then(() => {
        setUser(null);
      })
      .catch(err => console.error("Gagal melakukan logout server:", err));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Memeriksa Sesi Autentikasi InstockFlow...</h3>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard products={products} suppliers={suppliers} user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/products" element={user ? <Products products={products} setProducts={setProducts} suppliers={suppliers} user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/suppliers" element={user ? <Suppliers suppliers={suppliers} setSuppliers={setSuppliers} user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
