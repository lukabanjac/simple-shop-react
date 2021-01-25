import './App.css';
import * as React from 'react';
import Root from "./components/Root";
import { BrowserRouter } from "react-router-dom";
import ShopContext from './context/shop-context';



class App extends React.Component {
	state = {
		products: [],
		cart: []
	};

	addProductToCart = product => {
		console.log("Adding product!", product);
		const updatedCart = [...this.state.cart];
		const updatedItemIndex = updatedCart.findIndex(
			item => item.id === product.id
		);

		if (updatedItemIndex < 0) {
			updatedCart.push({...product, quantity: 1});
		} else {
			const updatedItem = {
				...updatedCart[updatedItemIndex]
			};
			updatedItem.quantity++;
			updatedCart[updatedItemIndex] = updatedItem;
		}
		this.setState({cart: updatedCart});
	};

	decreaseQuantity = productId => {
		const updatedCart = [...this.state.cart];
		
		const updatedItemIndex = updatedCart.findIndex(
			item => item.id === productId
			);
			
			console.log(updatedItemIndex)
		const updatedItem = {
			...updatedCart[updatedItemIndex]
		};
		
		updatedItem.quantity--;
		if (updatedItem.quantity <= 0) {
			updatedCart.splice(updatedItemIndex, 1);
		} else {
			updatedCart[updatedItemIndex] = updatedItem;
		}
		this.setState({cart: updatedCart});
	};

	increaseQuantity = productId => {
		const updatedCart = [...this.state.cart];
		const updatedItemIndex = updatedCart.findIndex(
			item => item.id === productId
		);

		const updatedItem = {
			...updatedCart[updatedItemIndex]
		};
		updatedItem.quantity++;
		updatedCart[updatedItemIndex] = updatedItem;
		this.setState({cart: updatedCart});
	};

	render() {
		return (
			<ShopContext.Provider 
			value={{
				products: this.state.products,
				cart: this.state.cart,
				addProductToCart: this.addProductToCart,
				removeProductFromCart: this.removeProductFromCart,
				increaseQuantity: this.increaseQuantity,
				decreaseQuantity: this.decreaseQuantity
			}}>
				<BrowserRouter>
					<Root />
				</BrowserRouter>
			</ShopContext.Provider>
		);
	}
}

export default App;
