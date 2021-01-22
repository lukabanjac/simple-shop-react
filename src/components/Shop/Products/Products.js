import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Products.css";
import Product from "./Product/Product";

class Products extends React.Component {
    constructor(props) {
        super(props);
        let products = this.formattedRows(props.value);
        
        this.state = {
            products : products
        };
    }


    formattedRows(list) {
        return list.reduce((c, n, i) => {
            if (i % 3 === 0) c.push([]);
            c[c.length - 1].push(n);
            return c;
        }, []);
    }


    render() {
        return (
            <Container id="products">
                        {
                            this.state.products.map((value, index) => {
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
        );
    }
};

export default Products;


