import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {

    return (
        <Router>
            <div>
                <Header/>

                <Route exact path={"/"} component={Home}/>
                <Route exact path={"/login"} component={Login}/>

                <Footer/>
            </div>
        </Router>
    );
}

export default App;
