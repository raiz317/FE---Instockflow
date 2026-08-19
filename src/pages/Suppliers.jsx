import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import AddSupplierModal from '../components/AddSupplierModal.jsx';
import EditSupplierModal from '../components/EditSupplierModal.jsx';
import '../styles/supplier.css';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Suppliers(props) {
    const { suppliers, setSuppliers, user, onLogout } = props;
    const name = user ? user.username : "Pengguna";
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [addSupplierForm, setAddSupplierForm] = useState({
        supplier: "",
        industry: "",
        email: "",
        phone: ""
    })
    const [editingSupplier, setEditingSupplier] = useState({
        id: "",
        supplier: "",
        industry: "",
        email: "",
        phone: ""
    });

    const [filter, setFilter] = useState({
        industry: "",
        searchQuery: ""
    })

    function handleSearchAndFilter(event) {
        const { name, value } = event.target;
        setFilter(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function handleFormSupplier(event) {
        const { name, value } = event.target;
        setAddSupplierForm(prevSupplier => ({
            ...prevSupplier,
            [name]: value
        }))
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        if (!addSupplierForm.supplier || !addSupplierForm.industry || !addSupplierForm.email || !addSupplierForm.phone) {
            alert("Tolong isi semua kolom formulir!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/suppliers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    supplier: addSupplierForm.supplier,
                    industry: addSupplierForm.industry,
                    email: addSupplierForm.email,
                    phone: addSupplierForm.phone
                })
            });

            if (!response.ok) throw new Error("Gagal menambah supplier");
            const insertedSupplier = await response.json();

            setSuppliers(prevSupplier => [...prevSupplier, insertedSupplier]);
            setAddSupplierForm({ supplier: "", industry: "", email: "", phone: "" });
            setIsModalOpen(false);
        } catch (error) {
            console.error(err);
            alert("Gagal menambahkan supplier ke server.");
        }
        /*setSuppliers(prevSupplier => {
            return [
                ...prevSupplier,
                {
                    id: Date.now(),
                    supplier: addSupplierForm.supplier,
                    industry: addSupplierForm.industry,
                    email: addSupplierForm.email,
                    phone: addSupplierForm.phone
                }
            ]
        });*/
    }

    function openEditModal(supplier) {
        setEditingSupplier(supplier);
        setIsEditModalOpen(true);
    }

    function handleEditFormChange(event) {
        const { name, value } = event.target;
        setEditingSupplier(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleFormEditSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/suppliers/${editingSupplier.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    supplier: editingSupplier.supplier,
                    industry: editingSupplier.industry,
                    email: editingSupplier.email,
                    phone: editingSupplier.phone
                })
            });

            if (!response.ok) throw new Error("Gagal mengedit supplier");

            setSuppliers(prevSupplier => {
                return prevSupplier.map(sup => {
                    if (sup.id === editingSupplier.id) {
                        return {
                            id: editingSupplier.id,
                            supplier: editingSupplier.supplier,
                            industry: editingSupplier.industry,
                            email: editingSupplier.email,
                            phone: editingSupplier.phone
                        }
                    }
                    return sup;
                });
            });
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(err);
            alert("Gagal memperbarui data supplier di server.");
        }
    }

    async function deleteSupplier(id) {
        if (!window.confirm("Apakah Anda yakin ingin menghapus supplier ini?")) return;

        try {
            const response = await fetch(`http://localhost:3000/api/suppliers/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error("Gagal menghapus supplier");
            setSuppliers(prevValue => prevValue.filter(item => item.id !== id));
        } catch (error) {
            console.error(err);
            alert("Gagal menghapus supplier dari server.");
        }
    }

    const filteredSuppliers = suppliers.filter(supplier => {
        const matchIndustry = filter.industry === "" ||
            supplier.industry.toLowerCase() === filter.industry.toLowerCase();
        const matchSearch = filter.searchQuery === "" ||
            supplier.supplier.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
            supplier.industry.toLowerCase().includes(filter.searchQuery.toLowerCase());
        return matchIndustry && matchSearch;
    });

    return (
        <div>
            <Sidebar user={name} onLogout={onLogout} />
            <div className='supplier-content'>
                <div className='header-supplier'>
                    <h2>Supplier Management</h2>
                    <button className='btn-add-supplier' onClick={() => setIsModalOpen(true)}>
                        Add Supplier
                    </button>
                </div>

                <div className='filter-search-supplier'>
                    <div className='filter-supplier'>
                        <div className="filter-group">
                            <label htmlFor="industrySelect" className="filter-label">Industry</label>
                            <div className="select-wrapper">
                                <select
                                    id="industrySelect"
                                    name="industry"
                                    value={filter.industry}
                                    onChange={handleSearchAndFilter}
                                    className="filter-select"
                                >
                                    <option value="">Pilih Industry</option>
                                    <option value="Logistik">Logistik</option>
                                    <option value="Elektronik">Elektronik</option>
                                    <option value="Manufaktur">Manufaktur</option>
                                </select>
                            </div>
                        </div>
                        <div className="search-group">
                            <input
                                type="text"
                                name="searchQuery"
                                placeholder="Search Industry..."
                                value={filter.searchQuery}
                                onChange={handleSearchAndFilter}
                                className="search-input"
                                autoComplete="off"
                            />
                        </div>
                        <div className="button-group">
                            <button type="button" className="btn-search">Search</button>
                            <button
                                type="button"
                                className="btn-clear"
                                onClick={() => setFilter({ industry: "", searchQuery: "" })}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='table-low-item'>
                        <h2>Daftar Supplier</h2>
                        <div className="table-responsive">
                            <table className='custom-table'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Supplier</th>
                                        <th>Industry</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSuppliers.length > 0 ? (
                                        filteredSuppliers.map((supplier, index) => (
                                            <tr key={supplier.id}>
                                                <td>{index + 1}</td>
                                                <td>{supplier.supplier}</td>
                                                <td>{supplier.industry}</td>
                                                <td>{supplier.email}</td>
                                                <td>{supplier.phone}</td>
                                                <td>
                                                    <IconButton className="btn-edit-supplier" onClick={() => openEditModal(supplier)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton className='btn-del-supplier' onClick={() => deleteSupplier(supplier.id)}>
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

                        <AddSupplierModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            addSupplierForm={addSupplierForm}
                            handleFormSupplier={handleFormSupplier}
                            handleFormSubmit={handleFormSubmit}
                        />

                        <EditSupplierModal
                            isEditModalOpen={isEditModalOpen}
                            setIsEditModalOpen={setIsEditModalOpen}
                            editingSupplier={editingSupplier}
                            handleEditFormChange={handleEditFormChange}
                            handleFormEditSubmit={handleFormEditSubmit}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Suppliers;