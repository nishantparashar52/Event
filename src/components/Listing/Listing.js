import React, { memo, useState } from 'react';
import Modal from '../Modal/Modal';
import { Form, Button } from 'react-bootstrap';
import './Listing.scss';

const Listing = memo(({ data }) => {
    const [show, setShow] = useState(false);
    const [product, selectedProduct] = useState(null);
    const handleClose = () => setShow(false);
    function getProductEnquiry(itemName) {
        setShow(true);
        selectedProduct(itemName);
    }
    return (
        <div className="row mt-5">
            {data.map((item, index) => {
                return (
                    <div className="col-lg-3 col-md-6 mb-5 product-container" key={index} onClick={() => getProductEnquiry(item)}>
                        <div className="ts-speaker">
                            <div className="speaker-img">
                                <img className="img-fluid" src={item.src}
                                    alt={item.alt} />
                                <div data-id="456" data-name="L Acoustic Kara "
                                    className="view-speaker"> <i className="icon icon-cart"></i> </div>
                            </div>
                            <div className="ts-speaker-info fsp16">{item.text}</div>
                        </div>
                    </div>
                );
            })
            }
            {show && <Modal handleClose={handleClose} showModal={show} headerTitle={product.text}>
                <Form>
                <Form.Group controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formGroupNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </Modal>}
        </div>
    );
});
export default Listing;
