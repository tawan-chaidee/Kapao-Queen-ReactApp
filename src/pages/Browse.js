import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import './style/Browse.css';
import './style/component.css';
import ItemDetail from './ItemDetail';
import { Link } from 'react-router-dom';
import Item from '../components/Item';


//Special item component
function Special({ title, description, img }) {
    return (
        <section class="promotion-container">
            <article class="item-3">
                <h2>{title}</h2>
                <p>{description}</p>
                <button>Find out more</button>
            </article>
            <img src={img} />
        </section>
    )
}

// Define data for Special item (item with color background)
// Since there is only couple of them which is sperate by foodlist
// we will be storing data here
const special1 = {
    title: "food",
    description:
        `Founded by Sudacha, a former head chief of Lanna royal family. Kapao
    queen offer a unique and flavorful experience that is unlike any
    other.`,
    img: "https://nypost.com/wp-content/uploads/sites/2/2018/01/180111-michelin-star-boost-thai-cooks-01.jpg?resize=744,461&quality=75&strip=all"
}

const special2 = {
    title: "Dessert & Drink",
    description:
        `Our restaurant serves up some of the most tantalizing and delicious Thai desserts you've ever tasted. From the creamy goodness of mango sticky
     rice to the refreshing sweetness of coconut-based desserts like tub tim grob and bua loy, our menu is sure to satisfy your cravings.`,
    img: "https://www.opentable.com/blog/wp-content/uploads/sites/108/2011/09/TCJD-2-2-Seal-Fate.jpg"
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem;
`

function Browse() {
    const [data, setData] = useState([]);

    // Fetch json data of items from api
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

    // sorting each items
    let foods = []
    let dessert = []
    data.forEach((item) => {
        if (item.type === `food`) {
            foods.push(item)
        } else if (item.type === `dessert`) {
            dessert.push(item)
        }
    })

    return <>
        <Special {...special1} />
        <Container>
            { foods.map((item) => (
                <Item {...item}></Item>
            ))}
        </Container>
        <Special {...special2} />
        <Container>
            {dessert.map((item) => (<Item {...item}></Item>))}
        </Container>
    </>


    // function itemClickHandler(id) {

    //     alert(id);
    //     <ItemDetail id={id} />
    // }
}




export default Browse
