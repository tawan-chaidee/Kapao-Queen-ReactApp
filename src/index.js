import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Browse from './Components/Browse';
import ItemDetail from './Components/ItemDetail';
import ItemManager from './Components/ItemManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Browse /> */}
    {/* <ItemDetail id={1}/> */}
    <ItemManager/>
  </React.StrictMode>
);





