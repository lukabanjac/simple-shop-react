import * as React from "react";
import ApiService from '../../service/api-service';
import { Form, Button } from "react-bootstrap";
import ShopContext from '../../context/shop-context'
import "./New.css";




class New extends React.Component {
    static contextType = ShopContext;
    constructor(props) {
        super(props);
        this.state = {
            title : "",
            description : "",
            price : "",
            image : ""
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        const setNew = ApiService.setNew(this.state)
        setNew.then((msg) => { this.context.addNewItem(this.state); this.props.history.push("/shop"); }).catch((msg) => { alert(msg) });
    }

    render() {
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
                    <Button variant="primary" type="button" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
};

export default New;