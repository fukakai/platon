import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";

class ProtectedRoute extends Component {

    render() {
        let {component: Component, typeAction: typeAction, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    if (this.isAuthenticated()) {
                        return <Component typeAction={typeAction} {...props} />;
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />
                        );
                    }
                }}
            />
        );
    }

    isAuthenticated = () => {
        let {role: role} = this.props;

        let isAuth = localStorage.getItem("platon:auth:authToken")
            && localStorage.getItem("platon:auth:authTokenExpirationDate")
            && (new Date() < new Date(
                localStorage.getItem("platon:auth:authTokenExpirationDate")))
            && (!role || localStorage.getItem("platon:auth:roles").indexOf(role)
                != -1)
        ;

        return isAuth;
    }
}

export default ProtectedRoute;