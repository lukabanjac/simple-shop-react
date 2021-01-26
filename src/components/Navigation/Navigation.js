import * as React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom"
import ShopContext from '../../context/shop-context'

import { Button, Nav, Navbar } from "react-bootstrap";


import logo from "../../assets/logo.png";

import "./Navigation.css";

class Navigation extends React.Component {
    static contextType = ShopContext;

    render() {
            
        return (
            
        <ShopContext.Consumer>
            {context => (
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
                            <Button><TiShoppingCart />{this.context.cart.reduce((count, currItem) => {return count + currItem.quantity;}, 0)}</Button>
                        </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </ShopContext.Consumer>
        );
        
    }
};

export default Navigation;
