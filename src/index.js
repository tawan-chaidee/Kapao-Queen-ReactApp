import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cookie from 'universal-cookie'

import Browse from './pages/Browse';
import ItemDetail from './pages/ItemDetail';
import ItemManager from './pages/ItemManager';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContext } from './context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>
);

function App() {
  let [userData, setUserData] = useState(null);

  return <UserContext.Provider value={[userData, setUserData]
  }>
    <NavBar />
    <Routes>
      <Route path="/Browse" element={<Browse />} />
      <Route path="/ItemManager" element={<ItemManager />} />
      <Route path="/ItemDetail/:id" element={<ItemDetail />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/Search/" element={<Search />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
      {/* <React path="/register/" element={<Register />} /> */}
    </Routes>
  </UserContext.Provider>
}

function NavBar() {
  let [userData, setUserData] = useContext(UserContext);

  useEffect(() => {
    // fetch userData from localStorage
    let userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData)
    setUserData(userData);
  }, [])

  function handleLogout() {
    setUserData(null);
    localStorage.removeItem('user');
    new Cookie().remove('token');
  }

  return (
    <header>
      <left>
        <Link to="/Browse">
          <div className="flex">
            <i className="fa-solid fa-list-ul"></i>
            <text2>Browse</text2>
          </div>
        </Link>
      </left>
      <Link to="/"><logo>Kapao Queen</logo></Link>
      <right>
        <Link to="/Search">
          <div className="flex">
            <i className="fa-solid fa-magnifying-glass"></i>
            <text2>Search</text2>
          </div>
        </Link>
        <div className="grow"></div>
        {userData ?
          <>
            <div>Hello, {userData.username}</div>
            <button onClick={handleLogout}>Logout</button>
          </>
          :
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        }
      </right>
    </header>
  )
}
