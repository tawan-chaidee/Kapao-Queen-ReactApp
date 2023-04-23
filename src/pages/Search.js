import React from "react";
import './style/Search.css'
import './style/Browse.css'
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";

function SearchBar () {


    // Data of fetch api call
    const [data,setData] = useState([]);
    // Data of input form
    const [query,setQuery] = useState('');
    // Type of input form
    const [type,setType] = useState('name');


    useEffect(() => {
        fetch('http://localhost:3030/foodlist')
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);


    function onSubmitHandler () {
        fetch(`http://localhost:3030/itemSearch/?type=${type}&search=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
    }

    const items = data.map((item) => (
        <item className="vertical" href="./page/som_tam.html">
            <img src={item.img} />
            <content>
                <h1>{item.name}</h1>
                <p>{item.browse_description}</p>
            </content>

            <price-container>
                <price>{item.price}</price>

                {/* assign route and paramter to pass when click */}
                <Link to = {`/ItemDetail/${item.id}`}>
                    <button className="order"></button>
                    <button className="later"></button>
                </Link>
            </price-container>
        </item>
    ))
    
    



    function onChangeHandler (event) {
        setQuery(event.target.value)
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
        <>
        <div class="food-search-1">
            <input type="text" onChange = {onChangeHandler} placeholder="Input..."/>
            <button class="cool-button" onClick={() => {onSubmitHandler()}}>Search</button> 
            <select id="type" name="type" onChange={typeHandler}>
                <option value="name">By Name</option>
                <option value="id">By ID</option>
                <option value="tag">By Tag</option>
            </select>
        </div>

        <section className="container auto-padding">
            {items}
        </section>

        </>
    )
    
}


export default SearchBar;