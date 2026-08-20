import React from 'react'
import '../styles/product.css';

function AddProductModal({ handleFormSubmit, newProduct, handleFormChange, setIsModalOpen, isModalOpen, suppliers }) {
    if (!isModalOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>Add New Product</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="modal-form-group">
                        <label htmlFor="prodName">Product Name</label>
                        <input id="prodName" type="text" name="name" value={newProduct.name} onChange={handleFormChange} placeholder="Enter product name" />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="prodCat">Category</label>
                        <input
                            id="prodCat"
                            type="text"
                            name="category"
                            value={newProduct.category}
                            onChange={handleFormChange}
                            placeholder="e.g. ATK, Elektronik, Makanan"
                        />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="prodStock">Stock</label>
                        <input
                            id="prodStock"
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleFormChange}
                            placeholder="Enter stock quantity"
                        />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="prodPrice">Price</label>
                        <input
                            id="prodPrice"
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleFormChange}
                            placeholder="Enter price per unit"
                            min="0"
                        />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="prodSup">Supplier</label>
                        <select id="prodSup" name="supplier" value={newProduct.supplier} onChange={handleFormChange}>
                            <option value="">Pilih Supplier</option>
                            {suppliers && suppliers.map(sup => {
                                return (
                                    <option key={sup.id} value={sup.supplier}>{sup.supplier}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="modal-btn-group">
                        <button type="button" className="btn-modal-cancel" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-modal-save">
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProductModal;