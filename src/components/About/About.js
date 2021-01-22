import React from "react";
import "./About.css";
import { BsFillInboxFill } from "react-icons/bs"

const About = () => {
    return (
        <div id="about">
            <h3 class="text1 mt-4">Entry test for JS position at EtonDigital.</h3>
            <h5 class="mt-4">Author:</h5>
            <h4>Luka Banjac</h4>
            
            <h6 class="email mt-4"><BsFillInboxFill /> banjacluka96@gmail.com</h6>
	    </div>
    );
};

export default About;