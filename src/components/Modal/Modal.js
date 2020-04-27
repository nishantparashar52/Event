import React from 'react';
import { Modal } from 'react-bootstrap';
function EkModal({ handleClose, handleShow, showModal, size = '', backdrop = true, headerTitle, children }) {// name
    return (
        <React.Fragment>
            <Modal show={showModal} onHide={handleClose} bsSize={size} backdrop={backdrop}>
                {headerTitle && <Modal.Header closeButton>
                    <Modal.Title>
                        {headerTitle}
                    </Modal.Title>
                </Modal.Header>}
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
export default EkModal;
