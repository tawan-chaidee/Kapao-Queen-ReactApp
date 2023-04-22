import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


import './style/component.css'

function HomePage() {

    const [data, setData] = useState([]);


    // Fetch data from api for trending item
    useEffect(() => {
        fetch('http://localhost:3030/foodlist')
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <article class="homepage-container">
        <img
          src="https://images.pexels.com/photos/5030168/pexels-photo-5030168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <h1 class="main-header">Good food don't have to be expensive</h1>
        <tem class="food-search"></tem>
        <div class="trending auto-padding">
          <h3>Trending</h3>
          <div class="list">
            {/* <a class="img" href="./page/pad_kaphrao.html">
              <item class="vertical">
                <img
                  src="https://images.deliveryhero.io/image/fd-th/LH/timq-listing.jpg"
                />
                <content>
                  <h1>Pad Kaphrao Mu Sap</h1>
                </content>
                <price-container>
                  <price>45</price>
                </price-container>
              </item>
            </a>
            <a class="img" href="./page/pad_kee_mao.html">
              <item class="vertical">
                <img
                  src="https://img.wongnai.com/p/1968x0/2019/03/01/5d965c9accac4601a82288b9cb173e23.jpg"
                />
                <content>
                  <h1>Pad Kee Mao Gai</h1>
                </content>
                <price-container>
                  <price>45</price>
                </price-container>
              </item>
            </a>
            <a class="img" href="./page/yum_mama.html">
              <item class="vertical">
                <img
                  src="https://img.wongnai.com/p/1920x0/2018/06/03/a4d569965f15488b89bc3cae6732a4d1.jpg"
                />
                <content>
                  <h1>Yum Mama</h1>
                </content>
                <price-container>
                  <price>40</price>
                </price-container>
              </item>
            </a> */}
          </div>
        </div>
      </article>
    )
}

export default HomePage;