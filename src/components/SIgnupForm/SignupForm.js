import React from 'react';
import { Form, FormGroup, Button, FormControl } from 'react-bootstrap';
const SignUpForm = props => {
    return (
        <div className="col-lg-4">
            <div className="hero-form-content">
                <h2>FILL YOUR REQUIREMENT</h2>
                <p>Feel free to share your requirement with us!</p>
                <div id="error_Requirement"></div>
                <Form>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Custom select</Form.Label>
                    <Form.Control as="occasion" custom>
                        <option selected="" value="">Select The Occasion</option>
                        <option>Corporate Event</option>
                        <option>Exhibition &amp; Seminars</option>
                        <option>Music Concert</option>
                        <option>Sports Events</option>
                        <option>Annual Festival</option>
                        <option>Wedding and Social Events</option>
                        <option>Other</option>
                    </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Row>
                </Form>
            </div>
        </div>
    );
};
export default SignUpForm;

