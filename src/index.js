import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Browse from './pages/Browse';
import ItemDetail from './pages/ItemDetail';
import ItemManager from './pages/ItemManager';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import Login from './pages/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/Browse" element={<Browse />} />
        <Route path="/ItemManager" element={<ItemManager />} />
        <Route path="/ItemDetail/:id" element={<ItemDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Search/" element={<Search />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

function NavBar() {
  return (
      <header>
        <left>
          <Link to = "/Browse">
            <div className="flex">
              <i className="fa-solid fa-list-ul"></i>
              <text2>Browse</text2>
            </div>
          </Link>
        </left>
        <Link to = "/"><logo>Kapao Queen</logo></Link>
        <right>
          <Link to = "/Search">
            <div className="flex">
              <i className="fa-solid fa-magnifying-glass"></i>
              <text2>Search</text2>
            </div>
          </Link>
          <div className="grow"></div>
          <a href="/login">
            <button className="login-button">Login</button>
          </a>
        </right>
      </header>
  )
}
