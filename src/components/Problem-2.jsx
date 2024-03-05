import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
const Problem2 = () => {
    const [modalA, setModalA] = useState(false);
    const [modalB, setModalB] = useState(false);
    const [modalC, setModalC] = useState(false);



    const handleOpenModalA = () => {
        console.log('DFDFD')
        setModalA(true);
        setModalB(false);
    };

    const handleOpenModalB = () => {
        setModalB(true);
        setModalA(false);
    };

    const handleOpenModalC = () => setModalC(true);


    const handleCloseModalA = () => setModalA(false);
    const handleCloseModalB = () => setModalB(false);
    const handleCloseModalC = () => setModalC(false);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                <Button className="btn btn-lg btn-primary" onClick={handleOpenModalA}>All Contacts</Button>
                    <Button className="btn btn-lg btn-warning" onClick={handleOpenModalB}>US Contacts</Button>
                </div>


                <Modal show={modalA} onHide={handleCloseModalA}>
                    <Modal.Header closeButton>
                        <Modal.Title>All Contacts  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <FormGroup className="mb-3" controlId="formBasicSearch">
                                <FormControl type="text" placeholder="Search"  />
                            </FormGroup>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }} >
                            <div >phone</div> 
                            <div >phone</div> 
                            <div >phone</div> 
                            <div >phone</div> 

                            </div>
                            <FormGroup className="my-2" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Only even"  />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleOpenModalA}>All Contacts</Button>
                        <Button variant="secondary" onClick={handleOpenModalB}>US Contacts</Button>
                        <Button variant="danger" onClick={handleCloseModalA}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalB} onHide={handleCloseModalB}>
                    <Modal.Header closeButton>
                        <Modal.Title>US Contacts </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <FormGroup className="mb-3" controlId="formBasicSearch">
                                <FormControl type="text" placeholder="Search" />
                            </FormGroup>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }} > 
                                    <div >phone</div> 
                                    <div >phone</div> 
                                    <div >phone</div> 
                                    <div >phone</div> 
                            </div>
                            <FormGroup className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Only even"  />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleOpenModalA}>All Contacts</Button>
                        <Button variant="secondary" onClick={handleOpenModalB}>US Contacts</Button>
                        <Button variant="danger" onClick={handleCloseModalB}>Close</Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
        </div>
    );
};

export default Problem2;