import * as React from "react";
import { BsFillPlusSquareFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import ShopContext from '../../../../context/shop-context';
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import "./Product.css";

class Product extends React.Component {
    static contextType = ShopContext;
    constructor(props) {
        super(props);
        this.state = { product : props.product }
    }

    
    addToCart = () => {
        this.context.addProductToCart(this.state.product);
    }

    
    setEditItem = () => {
        this.context.editItem(this.state.product.id);
    }

    
    deleteItem = () => {
        this.context.deleteProduct(this.state.product.id);
    }

    render() {
        return (
            <div>
                <Card style={{ width: '18rem', margin: '5px' }}>
                    <Card.Img variant="top" src={this.state.product.image} />
                    <Card.Body>
                        <Card.Title>{this.state.product.title}</Card.Title>
                        <Card.Subtitle>${this.state.product.price}</Card.Subtitle>
                        <Card.Text>{this.state.product.description}</Card.Text>
                        <div className="corner-buttons">
                            <Link to='/edit'>
                                <Button variant="primary" size="sm" onClick={this.setEditItem}>
                                    <BsPencilSquare />
                                </Button>
                            </Link>{' '}
                            <Button variant="secondary" size="sm" onClick={this.deleteItem}>
                                <BsTrash />
                            </Button>
                        </div>
                            <Button variant="primary" onClick={this.addToCart} block><BsFillPlusSquareFill /> Add to cart</Button>
                    </Card.Body>
                </Card>
            </div>
            
        );
    }
};

export default Product;