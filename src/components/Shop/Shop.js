import * as React from "react";
import ShopContext from '../../context/shop-context'
import { Button } from "react-bootstrap";
import { BsSearch, BsArrowClockwise } from "react-icons/bs";


import "./Shop.css";

import Products from "./Products/Products";


/* 
const radios = [
    { name: 'Lowest First', value: '1' },
    { name: 'Highest First', value: '2' },
  ]; */

class Shop extends React.Component {
    static contextType = ShopContext;

    refresh = () => {
        this.context.refresh();
    }

    render() {
        return (
            <ShopContext.Consumer>
                {context => (
                    <div id="shop">
                        <div>
                            <BsSearch className="mr-2" />
                            <input placeholder="Search" />
                            <Button className="ml-4" variant="success" onClick={this.refresh}><BsArrowClockwise /></Button>
                        </div>
                        <Products />
                    </div>
                )}
            </ShopContext.Consumer>
             
        );
    }

       
};

export default Shop;