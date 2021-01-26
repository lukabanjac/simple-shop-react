import './App.css';
import * as React from 'react';
import Root from "./components/Root";
import { BrowserRouter } from "react-router-dom";
import ShopContext from './context/shop-context';
import ApiService from './service/api-service';



class App extends React.Component {
	state = {
		products: [],
		cart: [],
		editingItem: {},
		formattedProducts: [],
		loaded: Boolean
	};



	componentDidMount() {
		this.refresh();
  }

	refresh = () => {
		this.setState({ loaded: false });
		const get = ApiService.getProducts();
		get.then((data) => {
			 this.setAll(data);
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
		this.setState({formattedProducts: this.formattedRows(products)});
	};
	setAll = products => {
		this.setProducts(products);
		this.setFormattedProducts(products);
	}
	//==========================================================================================

	







	// PRODUCT
	//==========================================================================================
	addNewItem = item => {
		console.log("Adding: ", item);
		console.log(Math.floor(Math.random()*100));
		item.id = Math.floor(Math.random()*100);
		let updatedProducts = [...this.state.products]
		updatedProducts.push(item);
		this.setAll(updatedProducts);
	}

	deleteProduct = productId => {
		let ID = parseInt(productId);
		let updatedProducts = [...this.state.products];
		const updatedItemIndex = updatedProducts.findIndex(
			item => item.id === ID
			);
		const deleteProduct = ApiService.deleteProduct(updatedProducts[updatedItemIndex]);
		deleteProduct.then((msg) => { 
			updatedProducts.splice(updatedItemIndex, 1);
			this.setAll(updatedProducts);
			console.log(msg); 
		}
		).catch((msg) => console.log(msg));

	}

	editItem = editedProduct => {
		let updatedProducts = [...this.state.products];
		const updatedItemIndex = updatedProducts.findIndex(
			item => item.id === editedProduct.id
			);
		updatedProducts[updatedItemIndex] = {...editedProduct};
		this.setAll(updatedProducts);
	}

	sortLowestPriceFirst = () => {
		const products = [...this.state.products];
		const sorted = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
		this.setFormattedProducts(sorted);
	}

	sortHighestPriceFirst = () => {
		const products = [...this.state.products];
		const sorted = products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
		console.log(sorted);
		this.setFormattedProducts(sorted);
	}

		

/* 		console.log(products[updatedItemIndex])
		this.setState({editingItem: products[updatedItemIndex]});
		console.log(this.state.editingItem) */
		
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














	render() {
		return (
			<ShopContext.Provider 
			value={{
				products: this.state.products,
				cart: this.state.cart,
				loaded: this.loaded,
				refresh: this.refresh,
				editingItem: this.editingItem,
				formattedProducts: this.state.formattedProducts,
				setFormattedProducts: this.setFormattedProducts,
				setProducts: this.setProducts,
				setAll: this.setAll,
				addProductToCart: this.addProductToCart,
				removeProductFromCart: this.removeProductFromCart,
				increaseQuantity: this.increaseQuantity,
				decreaseQuantity: this.decreaseQuantity,
				setEditItem: this.setEditItem,
				addNewItem: this.addNewItem,
				editItem: this.editItem,
				deleteProduct: this.deleteProduct,
				sortLowestPriceFirst: this.sortLowestPriceFirst,
				sortHighestPriceFirst: this.sortHighestPriceFirst,

			}}>
				<BrowserRouter>
					<Root />
				</BrowserRouter>
			</ShopContext.Provider>
		);
	}
}

export default App;
