import React from "react";
import './style/Search.css'
import './style/Browse.css'
import { useEffect } from "react";

import { useState } from "react";
import FoodItem from "../components/Item";

function SearchBar() {


    // Data of fetch api call
    const [data, setData] = useState([]);
    // Set Advance search on or off
    const [isAdvance, setisAdvance] = useState(false);
    // Search value
    const [searchValue, setSearchValue] = useState({});


    useEffect(() => {
        fetch('http://localhost:3030/foodlist')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setData(data.result)
                    console.log(data.result)
                } else {
                    alert(data.message)
                }
            })
            .catch(error => console.error(error));
    }, []);

    function onSubmitHandler() {
        let toBeSent = searchValue

        // if not advance
        if (!isAdvance) {
            let newQuery = {}
            newQuery[searchValue["search-type"]] = searchValue.name
            toBeSent = newQuery
        }

        // sent
        fetch(`http://localhost:3030/itemAdvanceSearch?` + new URLSearchParams(toBeSent).toString())
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setData(data.result)
                    console.log(data.result)
                } else {
                    alert(data.message)
                }
            })
    }


    function onChangeHandler(event) {
        setSearchValue((e)=>({
            ...e,
            [event.target.name]: event.target.value
        }))
        console.log(searchValue)
    }

    return <>
        <div class="food-search-1">
            <input type="text" onChange={onChangeHandler} name="name" placeholder="Input..." />
            <button class="cool-button" onClick={() => { onSubmitHandler() }}>Search</button>
            <button class="advance" onClick={() => setisAdvance(e=>!e)}>Advance Search</button>
            {isAdvance ?
                <>
                    <br></br>
                    <input type="text" class="advance-input" onChange={onChangeHandler} placeholder="Search by tag" name='tag' /><br />
                    <input type="text" class="advance-input" onChange={onChangeHandler} placeholder="Search by description" name='id' /><br />
                    <input type="number" class="advance-input" onChange={onChangeHandler} placeholder="Mininum price" name='minPrice' /><br />
                    <input type="number" class="advance-input" onChange={onChangeHandler} placeholder="Maximum price" name='maxPrice' /><br />
                </>
                :
                <>
                    <select id="type" name="search-type" onChange={onChangeHandler}>
                        <option value="name">By Name</option>
                        <option value="id">By ID</option>
                        <option value="tag">By Tag</option>
                    </select>
                </>
            }
        </div>
        <section className="container auto-padding">
            {data.map(item => (<FoodItem {...item}></FoodItem>))}
        </section>

    </>
}


export default SearchBar;