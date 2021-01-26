import * as React from "react";
import ShopContext from '../../context/shop-context'
import ApiService from '../../service/api-service';
import { Form, Button }from "react-bootstrap";
import "./Edit.css";



class Edit extends React.Component {
    static contextType = ShopContext;

    componentDidMount() {
        this.setState(this.context.editingItem);
        console.log("In edit: ", this.context.editingItem)
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        const setNew = ApiService.setNew(this.context.editingItem)
        setNew.then((msg) => { this.context.addNewItem(this.context.editingItem); }).catch((msg) => { alert(msg) });
    }

    render() {
        return (
            <ShopContext.Consumer>
                {context => (
            <div className="new-product">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product title:</Form.Label>
                        <Form.Control type="text" name="title" value={this.context.editingItem.title} onChange={this.handleChange} placeholder="Title" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Product description:</Form.Label>
                        <Form.Control type="text" name="description" as="textarea" value={this.context.editingItem.description} onChange={this.handleChange} placeholder="" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type="text" name="price" value={this.context.editingItem.price} onChange={this.handleChange} placeholder="$" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type="text" name="image" value={this.context.editingItem.image} onChange={this.handleChange} placeholder="URL" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
            )}
        </ShopContext.Consumer>
        );
    }
};

export default Edit;