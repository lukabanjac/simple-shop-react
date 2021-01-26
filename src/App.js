import './App.css';
import * as React from 'react';
import Root from "./components/Root";
import { BrowserRouter } from "react-router-dom";
import ShopContext from './context/shop-context';



class App extends React.Component {
	state = {
		products: [],
		cart: [],
		editItem: {},
		formattedProducts: []
	};



	componentDidMount() {
		const get = ApiService.getProducts();
		get.then((data) => {
			 this.context.setProducts(data);
			 this.context.setFormattedProducts(this.formattedRows(data));
			 this.setState({ loaded: true });
		}).catch((msg) => {
			 alert(msg);
		});
  }

  formattedRows(list) {
		return list.reduce((c, n, i) => {
			 if (i % 3 === 0) c.push([]);
			 c[c.length - 1].push(n);
			 return c;
		}, []);
  }






  	//SETTERS
	//==========================================================================================
	setProducts = products => {
		this.setState({products: products});
	};

	setFormattedProducts = products => {
		this.setState({formattedProducts: products});
	};
	//==========================================================================================

	







	// PRODUCT
	//==========================================================================================
	addNewItem = item => {
		let updatedProducts = [...this.state.products]
		updatedProducts.push(item);
		console.log(updatedProducts); 
		this.setState({products: updatedProducts});
	}

	deleteProduct = productId => {
		let ID = parseInt(productId);
		let updatedProducts = [...this.state.products];
		const updatedItemIndex = updatedProducts.findIndex(
			item => item.id === ID
			);
		updatedProducts.splice(updatedItemIndex, 1);
		console.log(updatedProducts); 
		this.setProducts(updatedProducts);
	}
	//==========================================================================================














	// CART
	//==========================================================================================
	addProductToCart = product => {
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

	removeProductFromCart = productId => {
		let ID = parseInt(productId);
		let updatedCart = [...this.state.cart];
		const updatedItemIndex = updatedCart.findIndex(
			item => item.id === ID
			);
		updatedCart.splice(updatedItemIndex, 1);
		this.setState({cart: updatedCart});
	}

	decreaseQuantity = productId => {
		let ID = parseInt(productId);
		const updatedCart = [...this.state.cart];
		
		const updatedItemIndex = updatedCart.findIndex(
			item => item.id === ID
			);
			
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
		let ID = parseInt(productId);
		const updatedCart = [...this.state.cart];
		const updatedItemIndex = updatedCart.findIndex(
			item => item.id === ID
		);

		const updatedItem = {
			...updatedCart[updatedItemIndex]
		};
		updatedItem.quantity++;
		updatedCart[updatedItemIndex] = updatedItem;
		this.setState({cart: updatedCart});
	};
	//==========================================================================================


/* 
	setEditItem = item => {
		this.state.editItem = item;
	} */

	render() {
		return (
			<ShopContext.Provider 
			value={{
				products: this.state.products,
				cart: this.state.cart,
				formattedProducts: this.state.formattedProducts,
				setFormattedProducts: this.setFormattedProducts,
				setProducts: this.setProducts,
				addProductToCart: this.addProductToCart,
				removeProductFromCart: this.removeProductFromCart,
				increaseQuantity: this.increaseQuantity,
				decreaseQuantity: this.decreaseQuantity,
				setEditItem: this.setEditItem,
				addNewItem: this.addNewItem,
				editItem: this.editItem,
				deleteProduct: this.deleteProduct
			}}>
				<BrowserRouter>
					<Root />
				</BrowserRouter>
			</ShopContext.Provider>
		);
	}
}

export default App;
