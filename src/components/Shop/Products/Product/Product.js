import * as React from "react";
import { BsFillPlusSquareFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import ShopContext from '../../../../context/shop-context'
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
                            <Button variant="primary" size="sm">
                                <BsPencilSquare />
                            </Button>{' '}
                            <Button variant="secondary" size="sm">
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