import React from "react";
import './style/NavBar.css'
import { useState } from "react";

// function SearchBar() {
//     return (
//         <input type="text" placeholder="Input your food...">
//         <button class="cool-button" onClick="search()">Search</button>
//     );
// }

function SearchBar () {

    const [data,setData] = useState('');
    const [type,setType] = useState('name');


    function submitHandler (event) {
        if (type === 'id') {

        } else if (type === 'name') {

        } else if (type === 'tag') {

        }
    }

    function onChangeHandler (event) {
        setData(event.target.value)
    }

    function typeHandler(event) {
        const val = event.target.value
        if (type === 'id') {
            setType(val)
        } else if (type === 'name') {
            setType(val)
        } else if (type === 'tag') {
            setType(val)
        }
    }

    return (
        <div class="food-search-1">
            <input type="text" onChange = {onChangeHandler}/>
            <button class="cool-button" onClick={submitHandler}>Search</button> 
            <select id="type" name="type" onChange={typeHandler}>
                <option value="name">By Name</option>
                <option value="id">By ID</option>
                <option value="tag">By Tag</option>
            </select>
        </div>
    )
    
}


export default SearchBar;