import * as React from "react";
import ShopContext from '../../context/shop-context'
import { Button, ButtonGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";


import "./Shop.css";

import Products from "./Products/Products";


/* 
const radios = [
    { name: 'Lowest First', value: '1' },
    { name: 'Highest First', value: '2' },
  ]; */

class Shop extends React.Component {
    static contextType = ShopContext;
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    lowestFirst = () => {
        this.context.sortLowestPriceFirst();
    }
    highestFirst = () => {
        this.context.sortHighestPriceFirst();
    }

    search = (event) => {
        const products = [...this.context.products];
        const searchText = this.state.searchText;
        let result = [];
        if (searchText !== "") {
            for (let product of products) {
                if (product.description.toUpperCase().includes(searchText.toUpperCase()) || 
                    product.title.toUpperCase().includes(searchText.toUpperCase())) {
                    result.push(product);
                }
            }
            if (result.length === 0) {
                this.context.setFormattedProducts(this.context.products);
            } else {
                this.context.setFormattedProducts(result);
            }
        } else {
            this.context.setFormattedProducts(this.context.products);
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({searchText: value});
        this.search();
    }

    
    handleEnter = (event) => {
        if (event.key === 'Enter') {
            this.search();
        }
    }


    render() {
        return (
            <ShopContext.Consumer>
                {context => (
                    <div id="shop">
                        <div>
                            <input placeholder="Search" onChange={this.handleChange} onKeyDown={this.handleEnter}></input>
                            <Button className="mr-2" size="sm" variant="secondary">
                                <BsSearch/>
                            </Button>
                            <span className="ml-2">
                                Price:
                            </span>
                            <ButtonGroup className="ml-2">
                                <Button variant="secondary" onClick={this.lowestFirst}>
                                    Lowest
                                </Button>
                                <Button variant="secondary" onClick={this.highestFirst}>
                                    Highest
                                </Button>
                            </ButtonGroup>
                        </div>
                        <Products />
                    </div>
                )}
            </ShopContext.Consumer>
             
        );
    }

       
};

export default Shop;