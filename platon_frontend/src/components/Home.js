import React, {Component} from "react";
import logo from "../logo.svg";
import Response from "./Response";

class Home extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        The edited version
                        Edit <code>src/App.js</code> and save to reload.
                    </p>

                    <p>The response is:</p>
                    <Response/>

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        )

    }
}

export default Home;