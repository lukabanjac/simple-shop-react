import * as React from "react";
import ShopContext from '../../context/shop-context'
import { Button, ButtonGroup } from "react-bootstrap";
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
            searchText: ""
        }
    }
    score_scaling = 2;


    lowestFirst = () => {
        this.context.sortLowestPriceFirst();
    }
    highestFirst = () => {
        this.context.sortHighestPriceFirst();
    }

    search = (event) => {
        const products = [...this.context.products];
        const searchText = this.state.searchText;
        let result = [];
        if (searchText !== "") {
            for (let product of products) {
                const lev = this.searchLev(this.cleanInputText(searchText), product);
                if (Object.keys(lev).length > 0 && lev.constructor === Object) {
                    result.push(lev);
                }
            }
            if (result.length === 0) {
                this.context.setFormattedProducts(this.context.products);
            } else {
                this.context.setFormattedProducts(result);
            }
        } else {
            this.context.setFormattedProducts(this.context.products);
        }
    }



    searchLev = (text, product) => {
        let found_product = {} // nadjen produkt

        if (product.description.toUpperCase().includes(text.toUpperCase()) || product.title.toUpperCase().includes(text.toUpperCase())) { //ako je nasao tacno tu koju smo unijeli, ne radimo levenstajn
            return product; 
        } else {
            const toSearch = product.title + " " + product.description;
            let p = toSearch.split(" ");
            let t = text.split(" ");
            for (let i = 0;  i < p.length; i++) {
                var n_operations = 0 // slicnost ukucane rijeci i trenutne kroz koju prolazimo, odnosno broj operacija (add, remove delete) koje se trebaju izvrsiti da bi bile iste
                let current_phrase_in_text = p.slice(i, i + t.length)
                n_operations = this.levensthein(current_phrase_in_text.join(" "), t.join(" "))
                if (n_operations < t.length * this.score_scaling) {// ne znam koji bi bio najoptimalniji score pa sam stavio da mozemo podesavati u odnosu na broj rijeci u unesenom tekstu
                    found_product = product
                    break;
                }
            }
            return found_product
        }

    }

    levensthein = (s1, s2) => {
        //inicijalizuj matricu sa jednim vise redom i kolonom (za prefix koji oznacava prazan string)
        //i ispuni sa nulama
        let matrix = [];
        for (let i = 0; i < s1.length + 1; i++) {
            matrix[i] = new Array(s2.length + 1).fill(0);
        }

        //popuni prvu kolonu sa vrijednostima od 1 do duzina-prvog-stringa
        for (let i = 1; i < s1.length + 1; i++) {
            matrix[i][0] = i
        }

        
        //popuni drugu kolonu sa vrijednostima od 1 do duzina-drugog-stringa
        for (let j = 1; j < s2.length + 1; j++) {
            matrix[0][j] = j
        }

        for (let j = 1; j < s2.length + 1; j++) {
            for (let i = 1;  i < s1.length + 1; i++) {
                var subCost = 0
                //ako se slova razlikuju, cijena zamjene ce biti 1
                if (s1[i] !== s2[j]) {
                    subCost = 1
                }
                //glavna formula
                matrix[i][j] = Math.min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i-1][j-1] + subCost)
            }
        }
        //vrati poslednju vrijednost u dijagonali matrice
        //koja oznacava koliko operacija (add, remove, update) 
        //bi trebalo da se izvrsi nad prvim stringom da bi bio jednak drugom
        return matrix[s1.length][s2.length]
    }


    cleanInputText = (input) => {
        let input_l = input.trim().split("") // skinemo sve razmake sa pocetka i kraja i podijelimo recenicu u listu slova
        let output_l = []
        let found = false; // bool koji oznacava da li smo naisli na razmak
        for (let i = 0; i < input_l.length; i++) { //prolazimo kroz sva slova u recenici
            if (input_l[i] == " ") { //ako smo naisli na razmak
                if (!found) { // i nije vise od jedan razmak
                    output_l.push(input_l[i]) //dodaj razmak u listu
                    found = true // podesimo da smo ga nasli, svaki sledeci posle njega ce biti skipovan
                }
            } else { //ako smo naisli na slovo
                output_l.push(input_l[i]) //dodamo slovo u listu
                found = false // ako je bio razmak prije, vatimo ga na false za nastavak
            }
        }
        return output_l.join("")
    }


















    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        this.setState({searchText: value});
        if (value === "") {
            this.context.setFormattedProducts(this.context.products);
        }
    }

    
    handleEnter = (event) => {
        if (event.key === 'Enter') {
            this.search();
        }
    }


    render() {
        return (
            <ShopContext.Consumer>
                {context => (
                    <div id="shop">
                        <div>
                            <input placeholder="Search" onChange={this.handleChange} onKeyDown={this.handleEnter}></input>
                            <Button className="mr-2" size="sm" variant="secondary">
                                <BsSearch/>
                            </Button>
                            <span className="ml-2">
                                Price:
                            </span>
                            <ButtonGroup className="ml-2">
                                <Button variant="secondary" onClick={this.lowestFirst}>
                                    Lowest
                                </Button>
                                <Button variant="secondary" onClick={this.highestFirst}>
                                    Highest
                                </Button>
                            </ButtonGroup>
                        </div>
                        <Products />
                    </div>
                )}
            </ShopContext.Consumer>
             
        );
    }

       
};

export default Shop;