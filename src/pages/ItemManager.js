
import React, { useEffect, useState } from 'react';

import './style/Manager.css';
import config from "../config"
import { useForm} from 'react-hook-form';

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

    // Store fetch data
    const [foodItems, setFoodItem] = useState([]);
    // store ingredients number
    const [ingredientsNum, setIngredientsNum] = useState(1);
    const [isEdit, setIsEdit] = useState(false);
    // forms variable
    const { register: addRegister, handleSubmit: addHandleSubmit, setValue } = useForm()

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

    const editHandler = async (id) => {
        // get the food information
        try {
            let response = await fetch(`${config.apiUrl}/itemDetail?id=${id}`);
            let result = await response.json();
            if (result.success) {
                setIsEdit(true);

                // set the value of form
                for (let key in result.result) {
                    setValue(key, result.result[key])
                }

                // set the value of ingredients
                setIngredientsNum(result.result.ingredientslist.length)
                for (let i = 0; i < result.result.ingredientslist.length; i++) {
                    setValue(`ingredients.${i}.name`, result.result.ingredientslist[i].name);
                    setValue(`ingredients.${i}.img`, result.result.ingredientslist[i].img);
                }

                // set the value of taglist
                setValue("taglist", result.result.taglist.join(","));
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addHandler = async (datas) => {
        let data = {...datas}

        // get the formatted ingredients
        let formattedIngredients = data.ingredients.map((ing) => `${ing.name}|${ing.img}`).join(",");
        delete data.ingredients;
        data.ingredientslist = formattedIngredients;

        // remove empty field
        for (let key in data) {
            if (data[key] === "") {
                delete data[key];
            }
        }

        // format the taglist
        // data.taglist = data.taglist.join(",");

        // send data to server
        console.log(data)
        try {
            let response
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
        // try {
        //     let response
        //     if (isEdit) {
        //         response = await fetch('http://localhost:3030/itemEdit', {
        //             method: 'PUT',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(data),
        //         });
        //     } else {
        //         response = await fetch('http://localhost:3030/itemSubmit', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(data),
        //         });
        //     }
        //     const result = await response.json();

        //     if (result.success) {
        //         window.location.reload();
        //     } else {
        //         alert(result.message);
        //     }

        // } catch (error) {
        //     console.error(error);
        // }

        
    }

    // fetch ingredients and fooditem
    useEffect(() => {
        fetch('http://localhost:3030/foodlist')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setFoodItem(data.result)
                    console.log(data.result)
                } else {
                    alert(data.message)
                }
                // setItem(data)
            })
            .catch(error => console.error(error));

    }, []);

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
            <form onSubmit={addHandleSubmit(addHandler)} method="POST">
                <section class="item">
                    <FormInput id="id" formData={addRegister("id", { required: true })} labelText="ID*" inputType='number' />
                    <FormInput id="name" formData={addRegister("name", { required: true })} labelText="English Name*" />
                    <FormInput id="thname" formData={addRegister("thai_name")} labelText="Thai Name" />
                    <FormInput id="browse_description" formData={addRegister("browse_description")} inputType='textarea' labelText="Overview Description" />
                    <FormInput id="description" formData={addRegister("description")} inputType='textarea' labelText="Body Description" />
                    <FormInput id="price" formData={addRegister("price")} inputType='number' labelText="Price tag" />
                    <FormInput id="type" formData={addRegister("type")} labelText="Type" />
                    <FormInput id="img" formData={addRegister("img")} labelText="Main image url" />
                    <FormInput id="background" formData={addRegister("background")} labelText="Background img url" />
                    <FormInput id="tags" formData={addRegister("taglist")} labelText="Tags (separated by ,)" />
                </section>
                <section class="item">
                    {Array.from({ length: ingredientsNum }, (_, i) => (
                        <>
                            <FormInput id={`ingredients_${i}`} formData={addRegister(`ingredients.${i}.name`)} labelText={`Ingredient ${i + 1} Name`} />
                            <FormInput id={`ingredients_${i}`} formData={addRegister(`ingredients.${i}.img`)} labelText={`Ingredient ${i + 1} Url`} />
                        </>
                    ))}
                    <button onClick={(e) => {
                        e.preventDefault()
                        setIngredientsNum(e => e + 1)
                    }}>+</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setValue(`ingredients.${ingredientsNum - 1}.name`, "")
                        setValue(`ingredients.${ingredientsNum - 1}.img`, "")
                        setIngredientsNum(e => e - 1)
                    }}>-</button>
                </section>
                <section class="item">
                    <button type="submit" class="edit2-button">Submit</button>
                </section>
                {/*

                    <label for="name">English Name*</label> <br />
                    <input id="name" {...register("add.name",{required: true})}/> <br />

                    <label for="thname">Thai Name</label> <br />
                    <input id="thname" {...register("add.thai_name")}/> <br />

                    <label for="browse_description">Short Description</label> <br />
                    <textarea id="browse_description" {...register("add.browse_description")}/> <br />
                    
                    <label for="description">Long Description</label> <br />
                    <textarea id="description" {...register("add.description")}/> <br />
                    
                    <label for="price">Price tag</label> <br />
                    <input id="price" {...register("add.price")} /> <br />

                    <label for="type">Type</label> <br />
                    <input id="type" {...register("add.type")} /> <br />
                    <label for="img">Main image url</label> <br />
                    <input type="text" id="img" name="img" /> <br />
                    <label for="background">Background img url</label> <br />
                    <input type="text" id="background" name="background" /> <br /> */}
                {/* </section> */}
            </form>
        </article>
    </>

    // const { register: AddRegister, handleSubmit } = useForm()


    // // Fetch json data of items from api
    // // To be use for table
    // useEffect(() => {
    //     fetch('http://localhost:3030/foodlist')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 setItem(data.result)
    //                 console.log(data.result)
    //             } else {
    //                 alert(data.message)
    //             }
    //             // setItem(data)
    //         })
    //         .catch(error => console.error(error));

    //     fetch(`${config.apiUrl}/ingredientList`)
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.success) {
    //                 setIngredient(data.result)
    //                 console.log(data.result)
    //             } else {
    //                 alert(data.message)
    //             }
    //         })
    // }, []);



    // //Store info to be use for put request, using react hook form
    // // Register is use to add new varible
    // // handleSubmit is use to 
    // const { register, handleSubmit } = useForm();



    // // Handle fetch put of Edit product form libary
    // // 'react hook form' libary will pass form info into data parameter
    // // Use this data to call put request
    // const putHandler = async (data) => {
    //     try {
    //         const response = await fetch(`http://localhost:3030/itemUpdate`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         });

    //         const result = await response.json();
    //         window.location.reload();
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const deleteHandler = async (deleteID) => {
    //     try {
    //         const response = await fetch(`http://localhost:3030/itemDelete?id=${deleteID}`, {
    //             method: 'DELETE',
    //         });

    //         const result = await response.json();
    //         window.location.reload();

    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // return (
    //     <> <table className="table">
    //         <thead>
    //             <tr>
    //                 <th>Item</th>
    //                 <th>Name</th>
    //                 <th>Price</th>
    //                 <th>Type</th>
    //                 <th></th>
    //             </tr>
    //         </thead>

    //         <tbody>
    //             {item.map((item) => (
    //                 <tr key={item.id}>
    //                     <td>{item.id}</td>
    //                     <td>{item.name}</td>
    //                     <td>{item.price}</td>
    //                     <td>{item.type}</td>
    //                     <td>
    //                         {/* Assign onclick handler of delete button */}
    //                         <button className="remove-button" onClick={() => { deleteHandler(item.id) }}>remove</button>
    //                     </td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>


    //         {/*ADD PRODUCT (POST) FORM*/}
    //         {/*Since html support post request, we can just use html for post*/}
    //         <article class="admin-container">
    //             <br /><br />
    //             <h1>Add Product</h1>
    //             <form action="http://localhost:3030/itemSubmit" method="POST">
    //                 <section class="item">
    //                     <label for="name">product name</label> <br />
    //                     <input type="text" id="name" name="name" required /> <br />

    //                     <label for="id">ID</label> <br />
    //                     <input type="text" id="id" name="id" required /> <br />


    //                     <label for="browse_description">Overview Description</label> <br />
    //                     <textarea type="text" id="browse_description" name="browse_description" /> <br />

    //                     <label for="price-tag">Price tag</label> <br />
    //                     <input type="text" id="price" name="price" /> <br />


    //                     <label for="thai_name">Thai Name</label> <br />
    //                     <input type="text" id="thai_name" name="thai_name" /> <br />

    //                     <label for="type">Type</label> <br />
    //                     <input type="text" id="type" name="type" /> <br />

    //                     <label for="img">Main image url</label> <br />
    //                     <input type="text" id="img" name="img" /> <br />

    //                     <label for="background">Background img url</label> <br />
    //                     <input type="text" id="background" name="background" /> <br />
    //                 </section>

    //                 <section class="item">
    //                     <label for="description">Body Description</label> <br />
    //                     <textarea type="text" id="description" name="description" /> <br />

    //                     <label for="ingredient_1">ingredient_1 url</label> <br />
    //                     <input type="text" id="ingredient_1" name="ingredient_1" /> <br />

    //                     <label for="ingredient_2">ingredient_2 url</label> <br />
    //                     <input type="text" id="ingredient_2" name="ingredient_2" /> <br />

    //                     <label for="ingredient_3">ingredient_3 url</label> <br />
    //                     <input type="text" id="ingredient_3" name="ingredient_3" /> <br />

    //                     <label for="tag1">Tags (split each tags with comma (,))</label> <br />
    //                     <input type="text" id="tag1" name="taglist" /> <br />

    //                     <label for="ing">Ingredient (split each ingredient with comma (,))</label> <br />
    //                     <input type="text" id="ing" name="ingredients"></input>

    //                     <input type='button' onClick={()=>{

    //                     }}></input>

    //                     {/* <label for="tag2">Tag2</label> <br />
    //                     <input type="text" id="tag2" name="tag2" /> <br /> */}



    //                     <br />
    //                     <button type="submit" class="edit2-button">Submit</button>
    //                 </section>
    //             </form>

    //             {/*Edit Product*/}
    //             {/*Note html don't support PUT */}
    //             <h1>Edit Product</h1>

    //             <form onSubmit={handleSubmit(putHandler)}>
    //                 <section className="item">
    //                     <label htmlFor="name">New product name</label>  <br />
    //                     <input type="text" id="name" name="name" {...register('name')} />  <br />

    //                     <label htmlFor="id">ID of edit item</label>  <br />
    //                     <input type="text" id="id" name="id" required {...register('id')} />  <br />

    //                     <label htmlFor="browse_description">Overview Description</label>  <br />
    //                     <textarea id="browse_description" name="browse_description" {...register('browse_description')} />  <br />

    //                     <label htmlFor="price">Price tag</label>  <br />
    //                     <input type="text" id="price" name="price" {...register('price')} />  <br />

    //                     <label htmlFor="thai_name">Thai Name</label>  <br />
    //                     <input type="text" id="thai_name" name="thai_name" {...register('thai_name')} />  <br />

    //                     <label htmlFor="type">Type</label>  <br />
    //                     <input type="text" id="type" name="type" {...register('type')} />  <br />

    //                     <label htmlFor="img">Main image url</label>  <br />
    //                     <input type="text" id="img" name="img" {...register('img')} />  <br />

    //                     <label htmlFor="background">Background img url</label>  <br />
    //                     <input type="text" id="background" name="background" {...register('background')} />  <br />
    //                 </section>

    //                 <section className="item">
    //                     <label htmlFor="description">Body Description</label>  <br />
    //                     <textarea id="description" name="description" {...register('description')} />  <br />

    //                     <label htmlFor="ingredient_1">Ingredient 1 url</label>  <br />
    //                     <input type="text" id="ingredient_1" name="ingredient_1" {...register('ingredient_1')} />  <br />

    //                     <label htmlFor="ingredient_2">Ingredient 2 url</label>  <br />
    //                     <input type="text" id="ingredient_2" name="ingredient_2" {...register('ingredient_2')} />  <br />

    //                     <label htmlFor="ingredient_3">Ingredient 3 url</label>  <br />
    //                     <input type="text" id="ingredient_3" name="ingredient_3" {...register('ingredient_3')} />  <br />

    //                     <label htmlFor="tag1">Tag1</label>  <br />
    //                     <input type="text" id="tag1" name="tag1" {...register('tag1')} />  <br />

    //                     <label htmlFor="tag2">Tag2</label>  <br />
    //                     <input type="text" id="tag2" name="tag2" {...register('tag2')} />  <br />

    //                     <br />
    //                     <button type="submit" className="edit2-button">Submit</button>
    //                 </section>
    //             </form>

    //             <br></br>
    //             <h1>Delete Product</h1>
    //             <form onSubmit={() => { deleteHandler(deleteID) }}>
    //                 <section className="item">
    //                     <label htmlFor="id">ID of delete product</label>  <br />
    //                     <input type="text" id="id" name="id" onChange={(e) => setDeleteID(e.target.value)} />  <br />
    //                     <br />
    //                     <button type="submit" className="remove-button">Submit</button>
    //                 </section>
    //             </form>
    //             <br></br>
    //         </article> </>
    // )

}

export default Manager