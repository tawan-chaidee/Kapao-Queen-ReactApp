import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style/ItemDetail.css';

function ItemDetail() {
    //Get parameter from url
    const {id} = useParams();

    const [item, setData] = useState([]);

    // Fetch json data of items from api
    useEffect(() => {
        fetch(`http://localhost:3030/itemDetail?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <section className="wrap-2 namewrap">
                <img src={item.background} />
                <h1>{item.name}</h1>
                <h2>{item.thai_name}</h2>
                <ul className="taglist">
                    <li>{item.tag1}</li>
                    <li>{item.tag2}</li>
                    {/* <li>Himaphan</li> */}
                </ul>
                <button className="back-button" onClick={() =>{window.history.back()}}>
                    <i className="fa-solid fa-arrow-left"></i>
                    Back
                </button>

            </section>
    
            <section className="introduction">
                <img src={item.img} />
                <h2>{item.browse_description}</h2>

                <p>
                {item.description}
                </p>
    
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
                <ul className="container-2">
                    <li>
                        <img src={item.ingredient_1} />
                    </li>
                    <li>
                        <img src={item.ingredient_2} />
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
        </>
    );    
}

export default ItemDetail