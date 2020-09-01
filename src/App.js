import React from 'react';
import './App.css';
import TopBar from './Components/TopBar'
import ProductList from './Components/Products';

function App() {
  return (
    <div className="App">
        <TopBar/>
        <ProductList/>
    </div>
  );
}

export default App;
