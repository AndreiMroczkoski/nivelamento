import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ModalConfirmarExclusao({ isOpen, onClose, onConfirm, itemNome }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Excluir {itemNome ? itemNome : "Item"}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Tem certeza que deseja excluir "{itemNome}"?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Excluir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}