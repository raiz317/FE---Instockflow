import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import '../styles/dashboard.css';
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";


function Dashboard(props) {

    const { products, suppliers } = props;
    const name = "Budi";

    const lowStockProducts = products.filter(product => product.stock <= 3);
    const totalProducts = products.length;
    const lowStockItem = lowStockProducts.length;

    const totalAsset = products.reduce((acc, current) => acc + (current.stock * current.price), 0);

    const totalSuppliers = suppliers.length;

    return (
        <div>
            <Sidebar user={name} />
            <div className='main-content'>
                <div className='welcome'>
                    <h1>Selamat Datang, {name}</h1>
                </div>
                <div className='component-details'>
                    <div className='card item-one'>
                        <CategoryIcon className="mui-card-icon" />
                        <h4>Total Products</h4>
                        {totalProducts}
                    </div>
                    <div className='card item-two'>
                        <GroupIcon className="mui-card-icon" />
                        <h4>Total Suppliers</h4>
                        {totalSuppliers}
                    </div>
                    <div className='card item-three'>
                        <ReportProblemIcon className="mui-card-icon" />
                        <h4>Stok Item Rendah</h4>
                        {lowStockItem}
                    </div>
                    <div className='card item-four'>
                        <MonetizationOnIcon className="mui-card-icon" />
                        <h4>Total Aset</h4>
                        Rp {totalAsset.toLocaleString("id-ID")}
                    </div>
                </div>
                <div className='table-low-item'>
                    <h2>Stok Item Rendah</h2>
                    <div className="table-responsive">
                        <table className='custom-table'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Produk</th>
                                    <th>Kategori</th>
                                    <th>Sisa Stok</th>
                                    <th>Supplier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lowStockProducts.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td>{index + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td style={{ color: product.stock === 0 ? '#ef4444' : 'inherit', fontWeight: 'bold' }}>
                                                {product.stock}
                                            </td>
                                            <td>{product.supplier}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
