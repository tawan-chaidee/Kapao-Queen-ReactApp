import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './style/ItemDetail.css';
import config from '../config';

let nutrientsKey = 
    {
        "SUGAR.added": ["Added sugar","g"],
        "CA": ["Calcium, Ca", "mg"],
        "CHOCDF.net": ["Carbohydrate (net)", "g"],
        "CHOCDF": ["Carbohydrate, by difference", "g"],
        "CHOLE": ["Cholesterol", "mg"],
        "ENERC_KCAL": ["Energy", "kcal"],
        "FAMS": ["Fatty acids, total monounsaturated", "g"],
        "FAPU": ["Fatty acids, total polyunsaturated", "g"],
        "FASAT": ["Fatty acids, total saturated", "g"],
        "FATRN": ["Fatty acids, total trans", "g"],
        "FIBTG": ["Fiber, total dietary", "g"],
        "FOLDFE": ["Folate, DFE", "µg"],
        "FOLFD": ["Folate, food", "µg"],
        "FOLAC": ["Folic acid", "µg"],
        "FE": ["Iron, Fe", "mg"],
        "MG": ["Magnesium", "mg"],
        "NIA": ["Niacin", "mg"],
        "P": ["Phosphorus, P", "mg"],
        "K": ["Potassium, K", "mg"],
        "PROCNT": ["Protein", "g"],
        "RIBF": ["Riboflavin", "mg"],
        "NA": ["Sodium, Na", "mg"],
        "Sugar.alcohol": ["Sugar alcohols", "g"],
        "SUGAR": ["Sugars, total", "g"],
        "THIA": ["Thiamin", "mg"],
        "FAT": ["Total lipid (fat)", "g"],
        "VITA_RAE": ["Vitamin A, RAE", "µg"],
        "VITB12": ["Vitamin B-12", "µg"],
        "VITB6A": ["Vitamin B-6", "mg"],
        "VITC": ["Vitamin C, total ascorbic acid", "mg"],
        "VITD": ["Vitamin D (D2 + D3)", "µg"],
        "TOCPHA": ["Vitamin E (alpha-tocopherol)", "mg"],
        "VITK1": ["Vitamin K (phylloquinone)", "µg"],
        "WATER": ["Water", "g"],
        "ZN": ["Zinc, Zn", "mg"]
    }


function ItemDetail() {
    //Get parameter from url
    const { id } = useParams();
    const [item, setData] = useState({});
    const [nutrition, setNutrition] = useState({});

    // Fetch json data of items from api
    useEffect(() => {
        // fetch item
        fetch(`${config.apiUrl}/itemDetail?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setData(data.result)
                    console.log(data.result)
                } else {
                    alert(data.message)
                }

                return fetch(`https://api.edamam.com/api/food-database/v2/parser?app_key=${config.edamamAppKey}&app_id=${config.edamanAppId}&ingr=${data.result.search_name}`)
            })
            .then(response => response.json())
            .then(data => {
                if (data.hints.length > 0) {
                    setNutrition(data.hints[0].food.nutrients)
                    console.log(data.hints[0].food.nutrients)
                } else {
                    alert(data.message)
                }
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
                    {
                        item.taglist?.map((tag) => (
                            <li>{tag}</li>
                        ))
                    }
                </ul>
                <button className="back-button" onClick={() => { window.history.back() }}>
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
                    {item.ingredients?.map((ingredient) => (
                        <li>
                            <img src={ingredient.img}></img><br></br>
                            <p1>{ingredient.name}</p1>
                        </li>))
                    }
                </ul>
            </section>

            <section className="ingredients">
                <h2>Nutrition Facts</h2>
                <p>Powered by <a href="https://developer.edamam.com" style={{color: "green"}}>Edamam</a></p>
                <ul className="container-2">
                {
                    Object.keys(nutrition).map((key) => (
                        <li class="nutri-box">
                            <div className='type'>{nutrientsKey[key][0]}</div>
                            <div>
                                <span className='number'>{Math.round(nutrition[key]*100)/100}</span>
                                <span>{nutrientsKey[key][1]}</span>
                            </div>
                        </li>
                    ))
                }
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
        </>
    );
}

export default ItemDetail