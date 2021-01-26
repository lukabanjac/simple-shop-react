import * as React from "react";
import ShopContext from '../../context/shop-context'
import ApiService from '../../service/api-service';
import { Form, Button }from "react-bootstrap";
import "./Edit.css";



class Edit extends React.Component {
    static contextType = ShopContext;
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        const item = {...this.props.location.state.editItem};
        //Ovo zbog toga sto ako je veci od 6, znaci da je napravljen u ovoj aplikaciji a nema ga na backu, pa ne mogu da ga getujem
        if (item.id > 6) {
            this.setState(item);
        } else {
            const getItemById = ApiService.getById(item.id);
            getItemById.then((data) => { this.setState(data) }).catch((msg) => { alert(msg) });
        }
    }

    componentWillUnmount() {
        this.props.location.state = {};
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        console.log(this.state);
        const setEdit = ApiService.setEdit(this.state);
        setEdit.then((msg) => { 
            this.context.editItem(this.state);
            this.props.history.push("/shop"); })
            .catch((msg) => { alert(msg) });
        this.props.location.state = {};
    }

    render() {
        return (
            <ShopContext.Consumer>
                {context => (
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
            )}
        </ShopContext.Consumer>
        );
    }
};

export default Edit;