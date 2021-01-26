import React from 'react';

export default React.createContext({
   products: [],
   cart: [],
   formattedProducts: [],
   addProductToCart: (product) => {},
   setProducts: (products) => {},
   setFormattedProducts: (products) => {},
	removeProductFromCart: (productId) => {},
	increaseQuantity: (productId) => {},
   decreaseQuantity: (productId) => {},
   addNewItem: (item) => {},
   deleteProduct: (itemId) => {},
   setEditItem: (item) => {}
});