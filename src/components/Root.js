import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./About/About";
//import Home from "./Home/About";
import Shop from "./Shop/Shop";
import Cart from "./Cart/Cart";
import Edit from "./Edit/Edit";
import Navigation from "./Navigation/Navigation";
import New from "./New/New";



const Root = () => {
    // path radi tako sto prepozna dio i ako samo pocinje sa tim onda ga ucita, ako hocemo bas tacan tajh path moramo da stavimo exact
    //primjer kad ne stavljamo exact je ako imamo path komponente koja se nalazi u komponenti npr. /about/our-team
    //ako ne stavimo switch i dvije budu match, pokazace ih sve, a ako ima switch onda prikazje prvu koja bude match pocevsi odozgo
    return (
        <div>
            <Navigation />
            <Switch>
                <Route component={Shop} exact path="/" /> 
                <Route component={About} exact path="/about" /> 
                <Route component={Shop} exact path="/shop" /> 
                <Route component={Cart} exact path="/cart" /> 
                <Route component={Edit} exact path="/edit" /> 
                <Route component={New} exact path="/new" /> 
            </Switch>
        </div>
    );
};

export default Root;