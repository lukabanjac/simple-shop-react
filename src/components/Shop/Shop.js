import * as React from "react";
import ApiService from '../../service/api-service';
import ShopContext from '../../context/shop-context'
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
            loaded : false
        }
    }
    

    render() {
        return (
            <ShopContext.Consumer>
                {context => (
                    <div id="shop">
                        <BsSearch />
                        <input placeholder="Search" />
                        <LoadedCheck isLoaded={this.state.loaded}/>
                    </div>
                )}
            </ShopContext.Consumer>
             
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