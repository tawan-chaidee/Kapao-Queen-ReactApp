import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Browse from './Components/Browse';
import ItemDetail from './Components/ItemDetail';
// import './Components/ItemDetail.css'
import ItemManager from './Components/ItemManager';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);

function NavBar() {
  return (
    <BrowserRouter>
      <header>
        <left>
          <Link to = "/Browse">
            <div className="flex">
              <i className="fa-solid fa-list-ul"></i>
              <text2>Browse</text2>
            </div>
          </Link>
        </left>
        <a href="${headerLink}/index.html"><logo>Kapao Queen</logo></a>
        <right>
          <Link to = "/ItemManager">
            <div className="flex">
              <i className="fa-solid fa-magnifying-glass"></i>
              <text2>Search</text2>
            </div>
          </Link>
          <div className="grow"></div>
          <a href="${headerLink}/login.html">
            <button className="login-button">Login</button>
          </a>
        </right>
      </header>

      <Routes>
        <Route path="/Browse" element={<Browse />} />
        <Route path="/ItemManager" element={<ItemManager />} />
        <Route path="/ItemDetail/:id" element={<ItemDetail />} />

      </Routes>
    </BrowserRouter>
  )
}
