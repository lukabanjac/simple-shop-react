import * as React from "react";
import ShopContext from "../../context/shop-context";
import { Container, Row, Col, Image, Button, ButtonGroup } from "react-bootstrap";
import "./Cart.css";




class Cart extends React.Component {
    static contextType = ShopContext;
    constructor(props) {
        super(props);
    }

    increaseQuantity = (event) => {    
        this.context.increaseQuantity(event.target.value);
    }
    
    decreaseQuantity = (event) => {        
        this.context.decreaseQuantity(event.target.value)
    }
    render() {
        return (
            
            <Container id="products" className="mt-5">
                        {
                            this.context.cart.map((value, index) => {
                                return (
                                    <Row className="product-row mb-2 pb-2" key={value.id}>
                                        <Col><Image rounded style={{"maxWidth": 100}} src={value.image}/></Col>
                                        <Col>
                                            <div className="product-title">{value.title} ×{value.quantity}</div>
                                            <div className="product-description">{value.description}</div>	
                                        </Col>
                                        <Col >
                                            <ButtonGroup>
                                                <Button variant="success" onClick={this.increaseQuantity} value={value.id}>+</Button>
                                                <Button variant="warning" onClick={this.decreaseQuantity} value={value.id}>-</Button>
                                            </ButtonGroup>
                                                <Button variant="danger">Remove</Button>
                                        </Col>
                                        <Col>
                                            <div className="product-price">${value.price}</div>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        <Row>
                            <Col className="total-text">
                                Total:
                            </Col>

                            <Col className="total-price">
                                ${
                                this.context.cart.reduce((total, item) => total + item.price * item.quantity, 0)
                                }
                            </Col>
                        </Row>

            </Container>
        );
    }
};

export default Cart;