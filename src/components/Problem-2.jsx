import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormGroup, FormControl } from 'react-bootstrap';

const Problem2 = () => {
    const [modalA, setModalA] = useState(false);
    const [modalB, setModalB] = useState(false);
    const [modalC, setModalC] = useState(false);

    const [contacts, setContacts] = useState([]);
    const [totalContact, setTotalContact] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(20);
 
 
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [onlyEven, setOnlyEven] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const fetchAllContacts = async (currentPage, searchTerm) => {
        try {  
            let apiUrl = `https://contact.mediusware.com/api/contacts/?page=${currentPage}`;


            // If searchTerm is provided, append it to the URL
            if (searchTerm) {
                // URL-encode the search term
                const encodedSearchTerm = encodeURIComponent(searchTerm);
                apiUrl += `&search=${encodedSearchTerm}`;
            }
    
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            // setContacts(data.results);
            if(data.results){
                setContacts(prevContacts => [...prevContacts, ...data.results]);
            }
            setTotalContact(data.count)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchUsContacts = async (currentPage, searchTerm) => {

        try {
            let apiUrl = `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${currentPage}`
    
            // If searchTerm is provided, append it to the URL
            if (searchTerm) {
                // URL-encode the search term
                const encodedSearchTerm = encodeURIComponent(searchTerm);
                console.log(encodedSearchTerm)
                apiUrl += `&search=${encodedSearchTerm}`;
            }
    
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            // setContacts(data.results);
            if(data.results){
                setContacts(prevContacts => [...prevContacts, ...data.results]); 
            } 
            setTotalContact(data.count)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

// fetch dynamic searchTerm against modal open
    useEffect(() => {
        console.log(modalA,modalB)
        modalA &&  fetchAllContacts(currentPage, searchTerm);
        modalB && fetchUsContacts(currentPage, searchTerm);
    }, [modalA,modalB,currentPage,searchTerm]);

  


    useEffect(() => {
        filterContacts();
    }, [contacts,  onlyEven]);
    const filterContacts = () => {
        let filtered  = [...contacts];
        // Filter by even ID if onlyEven is checked
        if (onlyEven) {
            filtered = filtered.filter(contact => contact.id % 2 === 0);
        }
        setFilteredContacts(filtered);
    };

    const handleCloseModalA = () => setModalA(false);
    const handleCloseModalB = () => setModalB(false);
    const handleCloseModalC = () => setModalC(false);

    const handleOpenModalA = () => {
        setSearchTerm('')
        setCurrentPage(1)
        setTotalContact(0)
        setFilteredContacts([])
        setModalB(false);
        setModalA(true);
    };

    const handleOpenModalB = () => {
        setSearchTerm('')
        setCurrentPage(1)
        setTotalContact(0)
        setFilteredContacts([])
        setModalA(false);
        setModalB(true);

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
                        <Modal.Title>All Contacts</Modal.Title>
                        {/* <Modal.Title>All Contacts ({totalContact}) <sub>shown:{filteredContacts.length}</sub> </Modal.Title> */}
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
                        <Button variant="primary"  onClick={handleOpenModalA}>All Contacts</Button>
                        <Button variant="secondary" onClick={handleOpenModalB}>US Contacts</Button>
                        <Button variant="danger" onClick={handleCloseModalA}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modalB} onHide={handleCloseModalB}>
                    <Modal.Header closeButton>
                        <Modal.Title>US Contacts</Modal.Title>
                        {/* <Modal.Title>US Contacts ({filteredContacts.length}) <sub>shown:{filteredContacts.length}</sub></Modal.Title> */}
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
