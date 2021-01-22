import * as React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Card, Button } from "react-bootstrap";

import "./Product.css";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product : props.product}
    }
    render() {
        return (
            <div>
                <Card style={{ width: '18rem', margin: '5px' }}>
                    <Card.Img variant="top" src={this.state.product.image} />
                    <Card.Body>
                        <Card.Title>{this.state.product.title}</Card.Title>
                        <Card.Text>{this.state.product.description}</Card.Text>
                        <Button variant="primary" block><BsFillPlusSquareFill /> Add to cart</Button>
                    </Card.Body>
                </Card>
            </div>
            
        );
    }
};

export default Product;