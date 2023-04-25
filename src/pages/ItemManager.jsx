
import React, { useEffect, useState } from 'react';

import './style/Manager.css';
import config from "../config"
import { useForm } from 'react-hook-form';

// label and input at the same time
function FormInput({ id, formData, labelText, inputType = "text" }) {
    return <>
        <label htmlFor={id}>{labelText}</label><br />
        {inputType === "textarea"
            ? <textarea id={id} {...formData}></textarea>
            : <input type={inputType} id={id} {...formData} />}
        <br />
    </>
}

function Manager() {
    const [foodItems, setFoodItem] = useState([]); // data that is fetched
    const [ingredientsNum, setIngredientsNum] = useState(1);
    const [isEdit, setIsEdit] = useState(false); // is it add or edit
    // read more on react-hook-form
    const { register, handleSubmit, setValue } = useForm()

    // fetch fooditem
    useEffect(() => {
        fetch(`${config.apiUrl}/foodlist`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFoodItem(data.result)
                } else {
                    alert(data.message)
                }
            })
            .catch(error => console.error(error));

    }, []);

    // delete food item after clicking button
    const deleteHandler = async (deleteID) => {
        try {
            const response = await fetch(`${config.apiUrl}/itemDelete?id=${deleteID}`, { method: 'DELETE' });

            const result = await response.json();
            if (result.success) {
                window.location.reload();
            } else {
                alert(result.message);
            }

            return result;
        } catch (error) {
            console.error(error);
        }
    }

    // edit food item after clicking button
    const editHandler = async (id) => {
        // get the food information
        try {
            let response = await fetch(`${config.apiUrl}/itemDetail?id=${id}`);
            response = await response.json();

            if (response.success) {
                setIsEdit(true);

                // set the value of form
                for (let key in response.result) {
                    setValue(key, response.result[key])
                }

                // set the value of ingredients
                setIngredientsNum(response.result.ingredientslist.length)
                for (let i = 0; i < response.result.ingredientslist.length; i++) {
                    setValue(`ingredients.${i}.name`, response.result.ingredientslist[i].name);
                    setValue(`ingredients.${i}.img`, response.result.ingredientslist[i].img);
                }

                // set the value of taglist
                setValue("taglist", response.result.taglist.join(","));
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const formSubmitHandler = async (datas) => {
        let data = { ...datas } // not to delete original data

        // format the ingredients
        let formattedIngredients = data.ingredients.map((ing) => `${ing.name}|${ing.img}`).join(",");
        delete data.ingredients;
        data.ingredientslist = formattedIngredients;

        // remove empty field
        for (let key in data) {
            if (data[key] === "") {
                delete data[key];
            }
        }

        // send data to server
        console.log(data)
        try {
            let response

            // check if it is edit or add
            if (isEdit) {
                response = await fetch(`${config.apiUrl}/itemUpdate`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch(`${config.apiUrl}/itemSubmit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            }

            const result = await response.json();

            if (result.success) {
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // ingredients form
    const ingredientsForm = [];
    for (let i = 0; i < ingredientsNum; i++) {
        ingredientsForm.push(<>
            <FormInput id={`ingredients_${i}`} formData={register(`ingredients.${i}.name`)} labelText={`Ingredient ${i + 1} Name`} />
            <FormInput id={`ingredients_${i}`} formData={register(`ingredients.${i}.img`)} labelText={`Ingredient ${i + 1} Url`} />
        </>)
    }

    // add ingredients button
    const addIngredientsForm = () => {
        setIngredientsNum(ingredientsNum + 1);
    }

    // remove ingredients button
    const removeIngredientsForm = () => {
        if (ingredientsNum > 1) {
            setIngredientsNum(ingredientsNum - 1);
        }

        // remove the value of the last ingredient
        setValue(`ingredients.${ingredientsNum - 1}.name`, "")
        setValue(`ingredients.${ingredientsNum - 1}.img`, "")
    }

    return <>
        <table className="table">
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
                {foodItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.type}</td>
                        <td>
                            {/* Assign onclick handler of delete button */}
                            <button className="remove-button" onClick={() => { deleteHandler(item.id) }}>remove</button>
                            <button className="remove-button" onClick={() => { editHandler(item.id) }}>edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>


        <article class="admin-container">
            <div className='mode-selecter'>
                <div className={isEdit || 'selected'} onClick={() => setIsEdit(false)}>Add Product</div>
                <div className={isEdit && 'selected'} onClick={() => setIsEdit(true)}>Edit Product</div>
            </div>
            <form onSubmit={handleSubmit(formSubmitHandler)} method="POST">
                <section class="item">
                    <FormInput id="id" formData={register("id", { required: true })} labelText="ID*" inputType='number' />
                    <FormInput id="name" formData={register("name", { required: true })} labelText="English Name*" />
                    <FormInput id="thname" formData={register("thai_name")} labelText="Thai Name" />
                    <FormInput id="browse_description" formData={register("browse_description")} inputType='textarea' labelText="Overview Description" />
                    <FormInput id="description" formData={register("description")} inputType='textarea' labelText="Body Description" />
                    <FormInput id="price" formData={register("price")} inputType='number' labelText="Price tag" />
                    <FormInput id="type" formData={register("type")} labelText="Type" />
                    <FormInput id="img" formData={register("img")} labelText="Main image url" />
                    <FormInput id="background" formData={register("background")} labelText="Background img url" />
                    <FormInput id="tags" formData={register("taglist")} labelText="Tags (separated by ,)" />
                </section>
                <section class="item">
                    {ingredientsForm}
                    <button type="button" onClick={addIngredientsForm}>+</button>
                    <button type="button" onClick={removeIngredientsForm}>-</button>
                </section>
                <section class="item">
                    <button type="submit" class="edit2-button">Submit</button>
                </section>
            </form>
        </article>
    </>
}

export default Manager