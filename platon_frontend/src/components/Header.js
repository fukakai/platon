import React, {Component} from "react";
import {authSetConnexionError} from "../store/actions/index";
import {connect} from "react-redux";

class Header extends Component {

    constructor(props) {
        super(props);
        this.props.onGetConnErrMsg(false, "bob");
    }

    render() {
        return (
            <div>
                This is a header !! :D
                <br/>
                Collecting a global state variable (through
                Redux): {this.props.connexionErrorMessage}
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

export default connect(mapPropsToState, mapPropsToDispatch)(Header);