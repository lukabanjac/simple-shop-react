import * as React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button }from "react-bootstrap";
import "./New.css";

const url = "https://my-json-server.typicode.com/brankostancevic/products/products";



class New extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            description : "",
            price : "",
            image : ""
        };
        this.submitted = false;

        
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        axios.post(url, this.state)
            .then(result => { alert("Success!");
                this.submitted = true;
                this.render();
            })
            .catch(() =>  { alert("FAIL!") })
        event.preventDefault();
    }

    render() {
        if (this.submitted) { return <Redirect to="/" /> }
        return (
            <div className="new-product">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product title:</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product description:</Form.Label>
                        <Form.Control type="text" name="description" as="textarea" value={this.state.description} onChange={this.handleChange} placeholder="" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="$" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="text" name="image" value={this.state.image} onChange={this.handleChange} placeholder="URL" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
};

export default New;