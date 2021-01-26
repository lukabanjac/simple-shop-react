import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Products.css";
import ShopContext from "../../../context/shop-context";
import Product from "./Product/Product";

class Products extends React.Component {
    static contextType = ShopContext;




    render() {
        return (
            <ShopContext.Consumer>
                {context => (
                    <Container id="products">
                                {
                                    this.context.formattedProducts.map((value, index) => {
                                        return (
                                            <Row key={index}>
                                                {
                                                    value.map((value, index) => {
                                                            return <Col key={value.id}>
                                                                <Product product={value} />
                                                            </Col>
                                                    })
                                                } 
                                            </Row> 
                                        ) 
                                    })
                                }

                    </Container>

                )}
            </ShopContext.Consumer>
        );
    }
};

export default Products;


