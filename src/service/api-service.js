import axios from 'axios';

const url = "https://my-json-server.typicode.com/brankostancevic/products/products";

class ApiService {

   static getProducts() {
      return new Promise((resolve, reject) =>
         axios.get(url)
           .then(res => {
               if (res.status === 200) {
                   resolve(res.data);
               } else {
                   reject("Error getting products!");
               }
           })
      );
   };

   static getById(id) {
      return new Promise((resolve, reject) =>
         axios.get(url + "/" + id)
           .then(res => {
               if (res.status === 200) {
                   resolve(res.data);
               } else {
                   reject("Error getting product with ID: ", id);
               }
           })
      );
   };

   static setNew(product) {
      return new Promise((resolve, reject) => {
         axios.post(url, product)
            .then(result => { resolve("Success"); })
            .catch(() =>  { reject("FAIL!"); })
      });
   };


   static setEdit(product) {
      return new Promise((resolve, reject) => {
         axios.put(url + "/" + product.id, product)
            .then(resulet => { resolve("Success"); })
            .catch(() => { reject("Fail!"); })
      })
   }

   
   static deleteProduct(product) {
      return new Promise((resolve, reject) => {
         axios.delete(url + "/" + product.id, product)
            .then(resulet => { resolve("Successfully deleted product: ".concat(product.title)); })
            .catch(() => { reject("Failed deleting!"); })
      })
   }

};

export default ApiService;