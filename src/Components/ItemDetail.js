
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './ItemDetail.css';


function ItemDetail(props) {

    const [item, setData] = useState([]);

    // Fetch json data of items from api
    useEffect(() => {
        fetch(`http://localhost:3030/foodDetail?id=${props.id}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);


    console.log(item)
    return (
        <body>
            <section className="wrap-2 namewrap">
                <img src={item.background} />
                <h1>{item.name}</h1>
                <h2>{item.thai_name}</h2>
                <ul className="taglist">
                    <li>{item.tag1}</li>
                    <li>{item.tag2}</li>
                    {/* <li>Himaphan</li> */}
                </ul>
                <button className="back-button" onclick="window.history.back()">
                    <i className="fa-solid fa-arrow-left"></i>
                    Back
                </button>
                <button className="edit-button" onclick='window.location.href = "../product-management.html"'>
                    <i className="fa-solid fa-pen"></i>
                    Edit
                </button>
            </section>
    
            <section className="introduction">
                <img src={item.img} />
                <h2>{item.browse_description}</h2>
                {item.description}
    
                <div className="order-container">
                    <span className="price">{item.price}</span>
                    <button className="order-button">
                        <i className="fa-solid fa-cart-shopping"></i>Order Now
                    </button>
                    <button className="later-button">
                        <i className="fa-solid fa-bookmark"></i>Wait for later
                    </button>
                </div>
            </section>
    
            <section className="ingredients">
                <h2>Key Ingredients</h2>
                <ul className="container">
                    <li>
                        <img src={item.ingredient_1} />
                        {/* <h3>Himalayan cheese</h3> */}
                    </li>
                    <li>
                        <img src={item.ingredient_2} />
                        {/* <h3>Himalayan herb</h3> */}
                    </li>
                    <li>
                        <img src={item.ingredient_3} />
                    </li>
                </ul>
            </section>
    
            <section className="seemsgood">
                <h2>Seems good?</h2>
                <p>
                    <button className="order-button">
                        <i className="fa-solid fa-cart-shopping"></i>Order Now
                    </button>
                    or
                    <button className="later-button">
                        <i className="fa-solid fa-bookmark"></i>Save for later
                    </button>
                </p>
            </section>
            <footer></footer>
            <script src="../lib/components.js"></script>
    
        </body>
    );    
}

export default ItemDetail