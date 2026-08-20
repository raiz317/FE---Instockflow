import React from "react";
import '../styles/supplier.css';

function EditSupplierModal({ isEditModalOpen, setIsEditModalOpen, editingSupplier, handleEditFormChange, handleFormEditSubmit }) {
    if (!isEditModalOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h3>Edit Supplier</h3>
                <form onSubmit={handleFormEditSubmit}>
                    <div className="modal-form-group">
                        <label htmlFor="editSupName">Supplier Name</label>
                        <input id="editSupName" type="text" name="supplier" value={editingSupplier.supplier} onChange={handleEditFormChange} />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="supInd">Industry</label>
                        <input
                            id="supInd"
                            type="text"
                            name="industry"
                            value={editingSupplier.industry}
                            onChange={handleEditFormChange}
                            placeholder="e.g. Manufaktur, Kuliner, Tekstil"
                        />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="editSupEmail">Email</label>
                        <input id="editSupEmail" type="email" name="email" value={editingSupplier.email} onChange={handleEditFormChange} placeholder="Enter supplier email" />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="editSupPhone">Phone</label>
                        <input id="editSupPhone" type="text" name="phone" value={editingSupplier.phone} onChange={handleEditFormChange} placeholder="Enter supplier phone" />
                    </div>

                    <div className="modal-btn-group">
                        <button type="button" className="btn-modal-cancel" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-modal-save">
                            Update Supplier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditSupplierModal;