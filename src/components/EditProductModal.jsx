import React from "react";
import '../styles/product.css';

function EditProductModal({ isEditModalOpen, setIsEditModalOpen, handleEditFormSubmit, editingProduct, handleEditFormChange, suppliers }) {

    if (!isEditModalOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>Edit Product</h3>
                <form onSubmit={handleEditFormSubmit}>
                    <div className="modal-form-group">
                        <label htmlFor="editName">Product Name</label>
                        <input id="editName" type="text" name="name" value={editingProduct.name} onChange={handleEditFormChange} />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="editCat">Category</label>
                        <select id="editCat" name="category" value={editingProduct.category} onChange={handleEditFormChange}>
                            <option value="ATK">ATK</option>
                            <option value="Elektronik">Elektronik</option>
                            <option value="Logistik">Logistik</option>
                        </select>
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="editStock">Stock</label>
                        <input id="editStock" type="number" name="stock" value={editingProduct.stock} onChange={handleEditFormChange} min="0" />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="editPrice">Price</label>
                        <input id="editPrice" type="number" name="price" value={editingProduct.price} onChange={handleEditFormChange} min="0" />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="editSup">Supplier</label>
                        <select id="editSup" name="supplier" value={editingProduct.supplier} onChange={handleEditFormChange}>
                            <option value="">Pilih Supplier</option>
                            {suppliers && suppliers.map(sup => (
                                <option key={sup.id} value={sup.supplier}>{sup.supplier}</option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-btn-group">
                        <button type="button" className="btn-modal-cancel" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-modal-save">
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProductModal;