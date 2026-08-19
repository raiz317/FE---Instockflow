import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import AddProductModal from '../components/AddProductModal.jsx';
import EditProductModal from '../components/EditProductModal.jsx';
import { Link } from 'react-router-dom';
import '../styles/product.css';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Products(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState({
        id: "",
        name: "",
        category: "",
        stock: "",
        price: "",
        supplier: ""
    });

    const { products, setProducts, suppliers, user, onLogout } = props;
    const name = user ? user.username : "Pengguna";
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        stock: "",
        price: "",
        supplier: ""
    })

    const [filter, setFilter] = useState({
        category: "",
        supplier: "",
        searchQuery: ""
    });

    function handleFilterChange(event) {
        const { name, value } = event.target;
        setFilter(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    function handleFormChange(event) {
        const { name, value } = event.target;
        setNewProduct(prevProducts => {
            return {
                ...prevProducts,
                [name]: value
            }
        })
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        if (!newProduct.name || !newProduct.category || !newProduct.stock || !newProduct.price || !newProduct.supplier) {
            alert("Tolong isi semua kolom formulir!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newProduct.name,
                    category: newProduct.category,
                    stock: Number(newProduct.stock),
                    price: Number(newProduct.price),
                    supplier: newProduct.supplier
                })
            });

            if (!response.ok) throw new Error('Gagal menambah produk');
            const insertedProduct = await response.json();

            setProducts(prevProducts => [...prevProducts, insertedProduct]);
            setNewProduct({ name: '', category: '', stock: '', price: '', supplier: '' });
            setIsModalOpen(false)
        } catch (error) {
            console.error(error);
            alert('Gagal menambah produk ke server')
        }

        /*setProducts(prevProducts => {
            return [
                ...prevProducts,
                {
                    id: Date.now(),
                    name: newProduct.name,
                    category: newProduct.category,
                    stock: Number(newProduct.stock),
                    price: Number(newProduct.price),
                    supplier: newProduct.supplier
                }
            ];
        });
        setNewProduct({ name: "", category: "", stock: "", price: "", supplier: "" });
        setIsModalOpen(false);*/
    }

    function openEditModal(product) {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    }

    function handleEditFormChange(event) {
        const { name, value } = event.target;
        setEditingProduct(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleEditFormSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editingProduct.name,
                    category: editingProduct.category,
                    stock: Number(editingProduct.stock),
                    price: Number(editingProduct.price),
                    supplier: editingProduct.supplier
                })
            });

            if (!response.ok) throw new Error('Gagal mengedit produk');

            setProducts(prevProducts => {
                return prevProducts.map(item => {
                    if (item.id === editingProduct.id) {
                        return {
                            id: editingProduct.id,
                            name: editingProduct.name,
                            category: editingProduct.category,
                            stock: Number(editingProduct.stock),
                            price: Number(editingProduct.price),
                            supplier: editingProduct.supplier
                        };
                    }
                    return item;
                });
            });
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(err);
            alert("Gagal memperbarui produk di server.");
        }
        /*setProducts(prevProducts => {
            return prevProducts.map(item => {
                if (item.id === editingProduct.id) {
                    return {
                        id: editingProduct.id,
                        name: editingProduct.name,
                        category: editingProduct.category,
                        stock: Number(editingProduct.stock),
                        price: Number(editingProduct.price),
                        supplier: editingProduct.supplier
                    };
                }
                return item;
            });
        });*/
    }

    async function deleteProduct(id) {
        if (!window.confirm('Apakah anda yakin ingin menghapus produk ini?')) return;

        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Gagal menghapus produk');
            setProducts(prevProducts => prevProducts.filter(item => item.id !== id));
        } catch (error) {
            console.error(err);
            alert("Gagal menghapus produk dari server.");
        }
    }

    const filteredProducts = products.filter(product => {
        const matchCategory = filter.category === "" ||
            product.category.toLowerCase() === filter.category.toLowerCase();
        const matchSupplier = filter.supplier === "" ||
            product.supplier.toLowerCase() === filter.supplier.toLowerCase();
        const matchSearch = filter.searchQuery === "" ||
            product.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
            product.supplier.toLowerCase().includes(filter.searchQuery.toLowerCase());
        return matchCategory && matchSupplier && matchSearch;
    });

    return (
        <div>
            <Sidebar user={name} onLogout={onLogout} />
            <div className='product-content'>
                <div className='header-product'>
                    <h2>Product Management</h2>
                    <button onClick={() => setIsModalOpen(true)} className="btn-add-product">
                        Add Product
                    </button>
                </div>

                <div className='filter-search-product'>
                    <div className='filter-product'>
                        <div className="filter-group">
                            <label htmlFor="categorySelect" className="filter-label">Category</label>
                            <div className="select-wrapper">
                                <select
                                    id="categorySelect"
                                    name="category"
                                    value={filter.category}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    <option value="">Pilih Kategori</option>
                                    <option value="atk">ATK</option>
                                    <option value="elektronik">Elektronik</option>
                                    <option value="logistik">Logistik</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter-group">
                            <label htmlFor="supplierSelect" className="filter-label">Supplier</label>
                            <div className="select-wrapper">
                                <select
                                    id="supplierSelect"
                                    name="supplier"
                                    value={filter.supplier}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    <option value="">Pilih Supplier</option>
                                    {props.suppliers.map(sup => {
                                        return <option key={sup.id} value={sup.supplier}>{sup.supplier}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="search-group">
                            <input
                                type="text"
                                name="searchQuery"
                                placeholder="Search Product..."
                                value={filter.searchQuery}
                                onChange={handleFilterChange}
                                className="search-input"
                                autoComplete="off"
                            />
                        </div>
                        <div className="button-group">
                            <button type="button" className="btn-search">Search</button>
                            <button
                                type="button"
                                className="btn-clear"
                                onClick={() => setFilter({ category: "", supplier: "", searchQuery: "" })}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <div className='table-low-item'>
                    <h2>Daftar Produk</h2>
                    <div className="table-responsive">
                        <table className='custom-table'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Produk</th>
                                    <th>Kategori</th>
                                    <th>Sisa Stok</th>
                                    <th>Harga</th>
                                    <th>Supplier</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.stock}</td>
                                            <td>Rp {product.price.toLocaleString("id-ID")}</td>
                                            <td>{product.supplier}</td>
                                            <td>
                                                <IconButton className="btn-edit-product" onClick={() => openEditModal(product)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton className='btn-del-product' onClick={() => deleteProduct(product.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center", color: "#64748b", padding: "24px" }}>
                                            Produk tidak ditemukan...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <AddProductModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        handleFormSubmit={handleFormSubmit}
                        newProduct={newProduct}
                        handleFormChange={handleFormChange}
                        suppliers={suppliers} />

                    <EditProductModal
                        isEditModalOpen={isEditModalOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        editingProduct={editingProduct}
                        handleEditFormChange={handleEditFormChange}
                        handleEditFormSubmit={handleEditFormSubmit}
                        suppliers={suppliers} />
                </div>
            </div>
        </div>
    )
}

export default Products;