import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

const Problem2 = () => {
    const [modalA, setModalA] = useState(false);
    const [modalB, setModalB] = useState(false);
    const [modalC, setModalC] = useState(false);
    const [allContacts, setContacts] = useState([]);
    const [usContacts, setUsContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchAllContacts = async () => {
        try {
            const response = await fetch('https://contact.mediusware.com/api/contacts/');
            const dat = await response.json();
            console.log(dat)
            setContacts(dat.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchUsContacts = async () => {
        try {
            const response = await fetch('https://contact.mediusware.com/api/country-contacts/United%20States/');
            const dat = await response.json();

            setUsContacts(dat.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        filterContacts();
    }, [allContacts, usContacts, onlyEven, searchTerm]);
    const filterContacts = () => {
        let filtered = [];
        console.log(allContacts)

        if (modalA) filtered = [...allContacts];

        if (modalB) filtered = [...usContacts];
        // Filter by even ID if onlyEven is checked
        if (onlyEven) {
            filtered = filtered.filter(contact => contact.id % 2 === 0);
        }
        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(contact =>
                contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredContacts(filtered);
    };

    const handleCloseModalA = () => setModalA(false);
    const handleCloseModalB = () => setModalB(false);
    const handleCloseModalC = () => setModalC(false);

    const handleOpenModalA = () => {
        fetchAllContacts();
        setModalA(true);
        setModalB(false);
    };

    const handleOpenModalB = () => {
        fetchUsContacts();
        setModalB(true);
        setModalA(false);
    };

    const handleOpenModalC = () => setModalC(true);

    const handleCheckboxChange = () => setOnlyEven(!onlyEven);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleScroll = (e) => {
        const bottom =
            e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={handleOpenModalA}>All Contacts</button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={handleOpenModalB}>US Contacts</button>
                </div>
                <Modal show={modalA} onHide={handleCloseModalA}>
                    <Modal.Header closeButton>
                        <Modal.Title>All Contacts ({filteredContacts.length})</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <FormGroup className="mb-3" controlId="formBasicSearch">
                                <FormControl type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                            </FormGroup>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }} onScroll={handleScroll}>
                                {filteredContacts.map((contact, key) => (
                                    <div className='my-2' key={key}>{contact.phone}  
                                    <hr></hr>
                                    </div> 
                                ))}
                              
                            </div>
                            <FormGroup className="my-2" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Only even" checked={onlyEven} onChange={handleCheckboxChange} />
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
                        <Modal.Title>US Contacts ({filteredContacts.length})</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <FormGroup className="mb-3" controlId="formBasicSearch">
                                <FormControl type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                            </FormGroup>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }} onScroll={handleScroll}>
                                {filteredContacts.map((contact, key) => (
                                     <div className='my-2' key={key}>{contact.phone}  
                                     <hr></hr>
                                     </div> 
                                ))}
                            </div>
                            <FormGroup className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Only even" checked={onlyEven} onChange={handleCheckboxChange} />
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
