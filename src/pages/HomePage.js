import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


import './style/component.css'
// import SearchBar from './SearchBar';

function HomePage() {

    // const [data, setData] = useState('');


    // // Fetch data from api for trending item
    // useEffect(() => {
    //     fetch('http://localhost:3030/foodlist')
    //         .then(response => response.json())
    //         .then(data => {
    //             setData(data)
    //         })
    //         .catch(error => console.error(error));
    // }, []);


    return (
        <article class="homepage-container">
        <img src="https://images.pexels.com/photos/5030168/pexels-photo-5030168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
        <h1 class="main-header">Good food don't have to be expensive</h1>

        {/* <SearchBar/> */}
      </article>
    )
}

export default HomePage;