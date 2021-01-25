import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom"

import { Button, Nav, Navbar } from "react-bootstrap";


import logo from "../../assets/logo.png";

import "./Navigation.css";

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Link to="/">
                <Navbar.Brand>
                    <img src={logo} alt="Logo" />
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="./about">
                        <Button variant="primary">About</Button>
                    </Link>
                     
                    <Link to="/new">
                        <Button variant="success">New Product</Button>
                    </Link>

                    <Link to="/cart">
                        <Button><TiShoppingCart /></Button>
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
