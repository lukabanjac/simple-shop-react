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
   }

   static setNew(product) {
      
      return new Promise((resolve, reject) => {
         axios.post(url, product)
            .then(result => { resolve("Success"); })
            .catch(() =>  { reject("FAIL!"); })
      });
   }

};

export default ApiService;