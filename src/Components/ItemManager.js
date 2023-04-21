
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './Manager.css';


function Manager() {

    // Store fetch data
    const [item, setItem] = useState([]);

    // Store id of form to delte item
    const [deleteID, setDeleteID] = useState([]);


    // Fetch json data of items from api
    // To be use for table
    useEffect(() => {
        fetch('http://localhost:3030/foodlist')
            .then(response => response.json())
            .then(data => {
                setItem(data)
            })
            .catch(error => console.error(error));
    }, []);

    //Store info to be use for put request, using react hook form
    // Register is use to add new varible
    // handleSubmit is use to 
    const { register, handleSubmit } = useForm();



    // Handle fetch put of Edit product form
    // 'react hook form' libary will pass form info into data parameter
    // Use this data call put request
    const putHandler = async (data) => {
        try {
            const response = await fetch(`http://localhost:3030/itemUpdate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    const deleteHandler = async (deleteID) => {

        try {

            console.log(JSON.stringify(deleteID))
            const response = await fetch(`http://localhost:3030/itemDelete?id=${deleteID}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            console.log(result);
            window.location.reload();

            return result;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <> <table className="table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {item.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.type}</td>
                        <td>
                            {/* Assign onclick handler of delete button */}
                            <button className="remove-button" onClick={() => { deleteHandler(item.id) }}>remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


            {/*ADD PRODUCT (POST) FORM*/}
            {/*Since html support post request, we can just use html for post*/}
            <article class="admin-container">
                <br /><br />
                <h1>Add Product</h1>
                <form action="http://localhost:3030/itemSubmit" method="POST">
                    <section class="item">
                        <label for="name">product name</label> <br />
                        <input type="text" id="name" name="name" required /> <br />

                        <label for="id">ID</label> <br />
                        <input type="text" id="id" name="id" required /> <br />


                        <label for="browse_description">Overview Description</label> <br />
                        <textarea type="text" id="browse_description" name="browse_description" /> <br />

                        <label for="price-tag">Price tag</label> <br />
                        <input type="text" id="price" name="price" /> <br />


                        <label for="thai_name">Thai Name</label> <br />
                        <input type="text" id="thai_name" name="thai_name" /> <br />

                        <label for="type">Type</label> <br />
                        <input type="text" id="type" name="type" /> <br />

                        <label for="img">Main image url</label> <br />
                        <input type="text" id="img" name="img" /> <br />

                        <label for="background">Background img url</label> <br />
                        <input type="text" id="background" name="background" /> <br />
                    </section>

                    <section class="item">
                        <label for="description">Body Description</label> <br />
                        <textarea type="text" id="description" name="description" /> <br />

                        <label for="ingredient_1">ingredient_1 url</label> <br />
                        <input type="text" id="ingredient_1" name="ingredient_1" /> <br />

                        <label for="ingredient_2">ingredient_2 url</label> <br />
                        <input type="text" id="ingredient_2" name="ingredient_2" /> <br />

                        <label for="ingredient_3">ingredient_3 url</label> <br />
                        <input type="text" id="ingredient_3" name="ingredient_3" /> <br />

                        <label for="tag1">Tag1</label> <br />
                        <input type="text" id="tag1" name="tag1" /> <br />

                        <label for="tag2">Tag2</label> <br />
                        <input type="text" id="tag2" name="tag2" /> <br />

                        <br />
                        <button type="submit" class="edit2-button">Submit</button>
                    </section>
                </form>

                {/*Edit Product*/}
                {/*Note html don't support PUT */}
                <h1>Edit Product</h1>

                <form onSubmit={handleSubmit(putHandler)}>
                    <section className="item">
                        <label htmlFor="name">New product name</label>  <br />
                        <input type="text" id="name" name="name" {...register('name')} />  <br />

                        <label htmlFor="id">ID of edit item</label>  <br />
                        <input type="text" id="id" name="id" required {...register('id')} />  <br />

                        <label htmlFor="browse_description">Overview Description</label>  <br />
                        <textarea id="browse_description" name="browse_description" {...register('browse_description')} />  <br />

                        <label htmlFor="price">Price tag</label>  <br />
                        <input type="text" id="price" name="price" {...register('price')} />  <br />

                        <label htmlFor="thai_name">Thai Name</label>  <br />
                        <input type="text" id="thai_name" name="thai_name" {...register('thai_name')} />  <br />

                        <label htmlFor="type">Type</label>  <br />
                        <input type="text" id="type" name="type" {...register('type')} />  <br />

                        <label htmlFor="img">Main image url</label>  <br />
                        <input type="text" id="img" name="img" {...register('img')} />  <br />

                        <label htmlFor="background">Background img url</label>  <br />
                        <input type="text" id="background" name="background" {...register('background')} />  <br />
                    </section>

                    <section className="item">
                        <label htmlFor="description">Body Description</label>  <br />
                        <textarea id="description" name="description" {...register('description')} />  <br />

                        <label htmlFor="ingredient_1">Ingredient 1 url</label>  <br />
                        <input type="text" id="ingredient_1" name="ingredient_1" {...register('ingredient_1')} />  <br />

                        <label htmlFor="ingredient_2">Ingredient 2 url</label>  <br />
                        <input type="text" id="ingredient_2" name="ingredient_2" {...register('ingredient_2')} />  <br />

                        <label htmlFor="ingredient_3">Ingredient 3 url</label>  <br />
                        <input type="text" id="ingredient_3" name="ingredient_3" {...register('ingredient_3')} />  <br />

                        <label htmlFor="tag1">Tag1</label>  <br />
                        <input type="text" id="tag1" name="tag1" {...register('tag1')} />  <br />

                        <label htmlFor="tag2">Tag2</label>  <br />
                        <input type="text" id="tag2" name="tag2" {...register('tag2')} />  <br />

                        <br />
                        <button type="submit" className="edit2-button">Submit</button>
                    </section>
                </form>

                <br></br>
                <h1>Delete Product</h1>
                <form onSubmit={() => { deleteHandler(deleteID) }}>
                    <section className="item">
                        <label htmlFor="id">ID of delete product</label>  <br />
                        <input type="text" id="id" name="id" onChange={(e) => setDeleteID(e.target.value)} />  <br />
                        <br />
                        <button type="submit" className="remove-button">Submit</button>
                    </section>
                </form>
                <br></br>
            </article> </>
    )

}

export default Manager