import React from "react";
import {Link} from "react-router-dom";
import{Navbar, Nav, Container} from "react-bootstrap";

function Headernav(){
    return(
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand as={Link} to="/">Hacker News</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Search the News</Nav.Link>
                <Nav.Link as={Link} to="/history">View Search History</Nav.Link>
             </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Headernav;