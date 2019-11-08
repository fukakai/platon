import React, {Component} from "react";
import {authSetConnexionError} from "../store/actions/index";
import {connect} from "react-redux";

class Footer extends Component {

    render() {
        return (
            <div>
                <br/>
                This is our wonderful Footer!
                <br/>
            </div>
        );
    }
}

const mapPropsToState = state => {
    return {
        connexionErrorMessage: state.users.connexionErrorMessage
    };
};

const mapPropsToDispatch = dispatch => {
    return {
        onGetConnErrMsg: (isConnexionError, connexionErrorMessage) => dispatch(
            authSetConnexionError(isConnexionError, connexionErrorMessage))
    };
};

export default connect(mapPropsToState, mapPropsToDispatch)(Footer);