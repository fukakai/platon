import React, {Component} from "react";

class Response extends Component {

    state = {
        responseHeader: "no header",
        responseBody: null
    };

    componentDidMount() {
        fetch('http://localhost:8989/users', {
            crossDomain: false,
            method: 'GET'
        })
        .catch(err => console.log("ERROR BOB#1: " + err))
        .then(res => res.json())
        .then(data =>
            this.setState(
                (prevState) => {
                    return {
                        ...prevState,
                        responseBody: data
                    }
                })
        )
        .catch(err => console.log("ERROR BOB#2: " + err))
    }

    render() {
        let bob = [];
        if (this.state.responseBody) {
            bob = this.state.responseBody.map(
                (val, key) =>
                    <div key={key}>{key} : {JSON.stringify(val)}</div>
            );
        }
        return (
            <div>
                {this.state.responseHeader}
                {bob}
                ...
            </div>
        );
    }
}

export default Response;