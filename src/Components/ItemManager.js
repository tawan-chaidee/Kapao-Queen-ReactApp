

// `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
//     `browse_description` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,

//         `thai_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
//             `tag1` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
//                 `tag2` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,

//                     `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
//                         `price` smallint(8)  DEFAULT NULL,

//                             `img` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
//                                 `background` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
//                                     `ingredient_1` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL, --url to img
// `ingredient_2` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
//     `ingredient_3` varchar(80) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,

//         `type` varchar(12)





import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './Manager.css';


function Manager() {

    const [data, setData] = useState([]);

    // Fetch json data of items from api
    useEffect(() => {
        fetch('http://localhost:3030/foodlist')
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);

    console.log(data[0])

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
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.type}</td>
                        <td>
                            <button className="edit2-button">edit</button>
                            <button className="remove-button">remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

            <article class="admin-container">

                <br /><br />
                <h1>Add Product</h1>


            {/*INSERT URL TO PUT API */}
                <form action="http://localhost:3030/submit" method="POST">
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


            </article> </>
    )

}

export default Manager