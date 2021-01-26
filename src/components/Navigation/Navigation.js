import * as React from "react";
import { TiShoppingCart, TiArrowLeftThick } from "react-icons/ti";
import { Link } from "react-router-dom"
import ShopContext from '../../context/shop-context'

import { Badge, Button, Nav, Navbar, Dropdown } from "react-bootstrap";


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
                            <Button className="about-button mr-5" variant="primary">About</Button>
                        </Link>
                        
                        <Link to="/new">
                            <Button className="mr-3" variant="success">New Product</Button>
                        </Link>

                        <Dropdown drop="left">
                            <Dropdown.Toggle className="shopping-cart-button" variant="success" id="dropdown-basic">  
                                <TiShoppingCart />
                                <Badge variant="primary">{this.context.cart.reduce((count, currItem) => {return count + currItem.quantity;}, 0)}</Badge>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    this.context.cart.map((value, index) => {
                                        return (
                                            <Dropdown.Item>
                                                <div className="dropdown-item-content">
                                                    <div>
                                                        <img className="dropdown-image" src={value.image} alt=""/>
                                                    </div>
                                                    <div className="dropdown-title">
                                                        {value.title}
                                                    </div>
                                                    <div className="dropdown-info">
                                                        x{value.quantity}
                                                    </div>
                                                </div>
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                                
                                <Dropdown.Item>
                                    <Link to="/cart">
                                        <Button className="shopping-cart-button">
                                            <TiArrowLeftThick />
                                            Go to checkout
                                        </Button>
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </ShopContext.Consumer>
        );
        
    }
};

export default Navigation;


