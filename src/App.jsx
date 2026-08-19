import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Suppliers from './pages/Suppliers.jsx';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([
    /*{ id: 1, name: "Kertas A4 Sinar Dunia", category: "ATK", stock: 2, price: 33000, supplier: "PT Sinar Abadi" },
    { id: 2, name: "Tinta Printer Epson Black", category: "Elektronik", stock: 1, price: 3600000, supplier: "CV Gading Mas" },
    { id: 3, name: "Stopmap Kebangsaan", category: "ATK", stock: 3, price: 3000, supplier: "PT Sinar Abadi" },
    { id: 4, name: "Isolasi Daimaru 2 Inch", category: "Logistik", stock: 7, price: 13000, supplier: "Toko Makmur" },*/
  ]);

  const [suppliers, setSuppliers] = useState([
    /*{ id: 1, supplier: "PT Sinar Abadi", industry: "Manufaktur", email: "sinar@abadi.co.id", phone: "08123456789", },
    { id: 2, supplier: "CV Gading Mas", industry: "Elektronik", email: "gading@mas.com", phone: "082345678910", },
    { id: 3, supplier: "Toko Makmur", industry: "Logistik", email: "toko@makmur.co.id", phone: "08345678910", }*/
  ]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Gagal memuat produk: ', error));

    fetch('http://localhost:3000/api/suppliers')
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error('Gagal memuat supplier', err));
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:3000/api/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard products={products} suppliers={suppliers} user={user} onLogout={handleLogout} />} />
        <Route path="/products" element={<Products products={products} setProducts={setProducts} suppliers={suppliers} user={user} onLogout={handleLogout} />} />
        <Route path="/suppliers" element={<Suppliers suppliers={suppliers} setSuppliers={setSuppliers} user={user} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  )
}

export default App;
