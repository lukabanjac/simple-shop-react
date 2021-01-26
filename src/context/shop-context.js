import React from 'react';

export default React.createContext({
   products: [],
   cart: [],
   formattedProducts: [],
   editingItem: {},
   addProductToCart: (product) => {},
   setProducts: (products) => {},
   setFormattedProducts: (products) => {},
	removeProductFromCart: (productId) => {},
	increaseQuantity: (productId) => {},
   decreaseQuantity: (productId) => {},
   addNewItem: (item) => {},
   deleteProduct: (itemId) => {},
   editItem: (item) => {},
   sortLowestPriceFirst: () => {},
   sortHighestPriceFirst: () => {}
});