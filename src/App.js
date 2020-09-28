import React, { useEffect } from 'react';
import './App.css';
import TopBar from './Components/TopBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProductList from './Components/Products';
import Login from './Components/Login';
import Wishlist from './Components/Wishlist';
import MyList from './Components/MyList';



function App() {

  useEffect(() => {
    console.log(window.location.href)

    if (window.location.href.startsWith("https://ecart-sell.web.app")) {
      window.location.href = "https://ecart-sell.firebaseapp.com"
    }
    // else if (window.location.href.startsWith("http://localhost:3000")) {
    //   window.location.href = "https://ecart-sell.firebaseapp.com"
    // }
  })



  return (
    <Router>
      <div className="App">
        {/* <LoginContext.Provider value={{ loginDetails, toggleLogin }}> */}
        <Switch>
          <Route exact path="/">
            {localStorage.getItem("loggedIn") == "true" ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/dashboard">
            {localStorage.getItem("loggedIn") == "true" ? <ProductList /> : <Redirect to="/login" />}
          </Route>

          <Route path="/wishlist">
            {localStorage.getItem("loggedIn") == "true" ? <Wishlist /> : <Redirect to="/login" />}
          </Route>

          <Route path="/myitems">
            {localStorage.getItem("loggedIn") == "true" ? <MyList /> : <Redirect to="/login" />}
          </Route>

          <Route path="/:any">
            {localStorage.getItem("loggedIn") == "true" ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Route>

        </Switch>
        {/* </LoginContext.Provider> */}
      </div>
    </Router>
  );
}

export default App;
