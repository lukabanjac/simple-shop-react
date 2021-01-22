import React from "react";
import { Link } from "react-router-dom"

import { Button, Nav, Navbar } from "react-bootstrap";


import logo from "../../assets/logo.png";

import "./Navigation.css";

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                <img src={logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="./about">
                        <Button variant="primary">About</Button>
                    </Link>
                     
                    <Link to="/new">
                        <Button variant="success">New Product</Button>
                    </Link>
                </Nav>
{/*                 <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;