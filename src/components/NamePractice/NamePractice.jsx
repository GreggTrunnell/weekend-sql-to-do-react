
import { useState } from 'react'
//used command-f to select all "App" from App.jsx and 
//replace with NamePractice.
function NamePractice(props) {
    return (
        <div className="NamePractice">
           <h1>Hello! My name is {props.firstName} {props.lastName} and this is my list.</h1>
        </div>
    );
} 

export default NamePractice;
