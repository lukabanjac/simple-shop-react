import * as React from "react";
import axios from 'axios';
import { BsSearch } from "react-icons/bs";

import "./Shop.css";

import Products from "./Products/Products";

const url = "https://my-json-server.typicode.com/brankostancevic/products/products";

/* 
const radios = [
    { name: 'Lowest First', value: '1' },
    { name: 'Highest First', value: '2' },
  ]; */

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products : [],
            loaded : false
        }
    }

    componentDidMount() {
        axios.get(url)
        .then(res => {
            if (res.status === 200) {
                this.setState({
                    products: res.data,
                    loaded: true
                })
            } else {
                alert("Error getting products! Please check your connection!")
            }
        })
    }

    

    render() {
        return (
            <div id="shop">
                <BsSearch />
                <input placeholder="Search" />

                <LoadedCheck isLoaded={this.state.loaded} products={this.state.products} />
            </div>
             
        );
    }

       
};

export default Shop;


function LoadedCheck(props) {
    if (props.isLoaded) {
        return <Products value={props.products} />
    }
    return <div>Loading...</div>
}