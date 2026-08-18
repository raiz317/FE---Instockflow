import React from 'react';
import '../styles/supplier.css';

function AddSupplierModal({ isModalOpen, setIsModalOpen, addSupplierForm, handleFormSupplier, handleFormSubmit }) {
    if (!isModalOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-card'>
                <h3>Add New Supplier</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="modal-form-group">
                        <label htmlFor="supName">Supplier Name</label>
                        <input type="text" name="supplier" id="supName" value={addSupplierForm.supplier} onChange={handleFormSupplier} placeholder="Enter supplier name" />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="supInd">Industry</label>
                        <select id="supInd" name="industry" value={addSupplierForm.industry} onChange={handleFormSupplier}>
                            <option value="">Select Industry</option>
                            <option value="Manufaktur">Manufaktur</option>
                            <option value="Elektronik">Elektronik</option>
                            <option value="Logistik">Logistik</option>
                        </select>
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="supEmail">Email</label>
                        <input id="supEmail" type="email" name="email" value={addSupplierForm.email} onChange={handleFormSupplier} placeholder="Enter supplier email" />
                    </div>

                    <div className="modal-form-group">
                        <label htmlFor="supPhone">Phone</label>
                        <input id="supPhone" type="text" name="phone" value={addSupplierForm.phone} onChange={handleFormSupplier} placeholder="Enter supplier phone" />
                    </div>

                    <div className="modal-btn-group">
                        <button type="button" className="btn-modal-cancel" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-modal-save">
                            Save Supplier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSupplierModal;