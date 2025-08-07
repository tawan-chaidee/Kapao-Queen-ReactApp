import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cookie from 'universal-cookie'
import jwt_decode from 'jwt-decode'

import Browse from './pages/Browse';
import ItemDetail from './pages/ItemDetail';
import ItemManager from './pages/ItemManager';
import HomePage from './pages/HomePage';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserContext } from './context';
import config from './config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


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

  return <UserContext.Provider value={[userData, setUserData]}>
    <NavBar />
    <div class="main-body">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Browse" element={<Browse />} />
      <Route path="/ItemManager" element={<ItemManager />} />
      <Route path="/ItemDetail/:id" element={<ItemDetail />} />
      <Route path="/Search/" element={<Search />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/register/" element={<Register />} />
    </Routes>
    </div>
    <Footer/>
  </UserContext.Provider>
}

function NavBar() {
  let [userData, setUserData] = useContext(UserContext);

  useEffect(() => {
    // console.log("hi")
    // get token from cookie
    let token = new Cookie().get('token');
    let tokenData = token ? jwt_decode(token) : {};
    console.log(token)

    // if token exists, fetch user data from server
    if (token) {
      fetch(`${config.apiUrl}/user/${tokenData.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => res.json())
        .then(data => {
          if (!data.success) {
            alert("Token expired. Please login again.")
            setUserData(null);
            localStorage.removeItem('user');
            new Cookie().remove('token');
            return;
          }

          console.log(data);
          setUserData(data.user);
        })
        .catch(err => {
          console.log(err)
          alert("Token expired. Please login again.")
        })
    }
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
            <FontAwesomeIcon icon={faListUl} style={{ margin: "0 .5em" }} />
            {/* <i className="fa-solid fa-list-ul"></i> */}
            <text2>Browse</text2>
          </div>
        </Link>
      </left>
      <Link to="/"><logo>Kapao Queen</logo></Link>
      <right>
        <Link to="/Search">
          <div className="flex">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ margin: "0 .5em" }} />
            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
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

function Footer() {
  let [userData, setUserData] = useContext(UserContext);

  return (<footer>
    <ul>
      {userData?.is_admin &&
      <>
      You are admin!
      <Link to="itemmanager">
        <li>Product admin</li>
      </Link>
      </>
      }
    </ul>
    <div style={{textAlign: "right"}}>
      Kapao Queen<br/>
      Your cheap Thai food
    </div>
  </footer>)
}
