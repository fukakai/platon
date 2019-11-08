import {uiStartLoading, uiStopLoading} from "./index";

import {
    AUTH_MODIFY_USER,
    AUTH_REMOVE_TOKEN,
    AUTH_REMOVE_USERNAME,
    AUTH_SET_CONNEXION_ERROR,
    AUTH_SET_TOKEN,
    AUTH_SET_USERINFOS,
    AUTH_SET_USERNAME,
    AUTH_SET_USERS,
    BASE_URL
} from './actionTypes';

export const tryAuth = (authData, history) => {
    //console.log(authData);
    return dispatch => {
        dispatch(uiStartLoading());
        dispatch(authSetConnexionError(false, ""));
        //console.log("authData : "+authData.username+"/"+authData.authToken);
        let url = BASE_URL + "/api/auth/signin";

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                username: authData.username,
                password: authData.password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            dispatch(authSetConnexionError(true,
                "Merci de vérifier votre connexion!"));
            dispatch(uiStopLoading());
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else if (parseInt(res.status, 10) === 401 || parseInt(res.status,
                10) === 500) {
                return {
                    status: res.status,
                    message: "Erreur 401"
                };
            } else {
                throw (new Error(res.status.toString()));
            }
        })
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if (!parsedRes.token || !parsedRes.expiresAt) {
                dispatch(authSetConnexionError(true,
                    "Une erreur est survenue, merci de réessayer!"));

            }
            if (parseInt(parsedRes.status, 10) === 401 || parseInt(
                parsedRes.status, 10) === 500) {
                dispatch(authSetConnexionError(true,
                    "Erreur de login ou de mot de passe ou Utilisateur inactif. Merci de reessayer!"));
            } else {
                dispatch(
                    authStoreToken(
                        parsedRes.token,
                        authData.username,
                        parsedRes.expiresAt,
                        parsedRes.roles
                    )
                );
                history.push("/home");
            }
        })
        .catch(err => {
            dispatch(authSetConnexionError(true,
                "Erreur de connexion, merci de réessayer!"));
            dispatch(uiStopLoading());
        });
    };
};

export const signupUser = (userData, history, isEnseignant, errorKey,
    component) => {
    return dispatch => {
        dispatch(uiStartLoading());
        dispatch(authSetConnexionError(false, "", errorKey, component));
        //console.log("authData : "+authData.username+"/"+authData.authToken);
        let url = BASE_URL + "/users";

        fetch(url, {
            method: "POST",
            body: JSON.stringify(userData.user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            dispatch(authSetConnexionError(true,
                "Merci de vérifier votre connexion!", errorKey, component));
            dispatch(uiStopLoading());
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else if (parseInt(res.status, 10) === 400) {
                return res.json();
            } else if (parseInt(res.status, 10) === 401) {
                return {
                    status: res.status,
                    message: "Erreur 401"
                };
            } else {
                throw (new Error(res.status.toString()));
            }
        })
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if (parseInt(parsedRes.status, 10) === 400) {
                console.log(parsedRes.message);
                dispatch(
                    authSetConnexionError(true, parsedRes.message, errorKey,
                        component));
            } else if (parseInt(parsedRes.status, 10) === 401) {
                dispatch(authSetConnexionError(true,
                    "Erreur de login ou de mot de passe, merci de réessayer!",
                    errorKey, component));
            }
        })
        .catch(err => {
            dispatch(authSetConnexionError(true,
                "Erreur de connexion, merci de réessayer!", errorKey,
                component));
            dispatch(uiStopLoading());
        });
    };
};

//get token from redux store or from storage
export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().users.authToken;
            const username = getState().users.username;
            const expiresAt = getState().users.authTokenExpirationDate;
            const roles = getState().users.roles;

            //console.log({authToken: token, username: username, expiresAt: expiresAt});

            if (!roles || !token || !username || !expiresAt || new Date(
                expiresAt) <= new Date()) {
                console.log("getting token from storage");
                try {
                    let fetchedToken = localStorage.getItem(
                        "platon:auth:authToken");
                    let fetchedUsername = localStorage.getItem(
                        "platon:auth:username");
                    let fetchedExpiresAt = localStorage.getItem(
                        "platon:auth:authTokenExpirationDate");
                    let fetchedRoles = localStorage.getItem(
                        "platon:auth:roles");

                    //console.log({authToken: fetchedToken, username: fetchedUsername, expiresAt: fetchedExpiresAt});

                    if (!fetchedRoles || !fetchedToken || !fetchedUsername
                        || !fetchedExpiresAt || new Date(fetchedExpiresAt)
                        <= new Date()) {
                        console.log('local storage get Error 1');
                        reject();
                        return;
                    } else {

                        dispatch(
                            authStoreToken(
                                fetchedToken,
                                fetchedUsername,
                                fetchedExpiresAt,
                                fetchedRoles
                            )
                        );
                        //console.log({authToken: fetchedToken, username: fetchedUsername, expiresAt: fetchedExpiresAt});
                        resolve({
                            authToken: fetchedToken,
                            username: fetchedUsername,
                            expiresAt: fetchedExpiresAt,
                            roles: fetchedRoles
                        });
                    }
                } catch (e) {
                    console.log('local storage get Error');
                    reject();
                    return;
                }
            } else {
                //console.log("getting token from redux");
                //console.log({authToken: token, username: username, expiresAt: expiresAt});
                resolve({
                    authToken: token,
                    username: username,
                    expiresAt: expiresAt,
                    roles: roles
                });
            }
        });
        return promise
        .catch(err => {
            //console.log("no token found");
            dispatch(authRemoveToken());
            //dispatch(authRemoveusername());
            dispatch(authClearStorage());
        })
        .then(authData => {
            if (!authData) {
                throw new Error(); //goto auth
            } else {
                if (new Date() < new Date(
                    (new Date(authData.expiresAt)).getTime() + (15 * 60000))) {

                    //refreshing the token
                    //dispatch(uiStartLoading());
                    let url = BASE_URL + "/api/auth/refreshToken";

                    fetch(url, {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + authData.authToken
                        }
                    })
                    .catch(err => {
                        //dispatch(authSetConnexionError(true,"Merci de vérifier votre connexion!"));
                        //dispatch(uiStopLoading());
                    })
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        } else if (parseInt(res.status, 10) === 401 || parseInt(
                            res.status, 10) === 500) {
                            return {
                                status: res.status,
                                message: "Erreur 401"
                            };
                        } else {
                            throw (new Error(res.status.toString()));
                        }
                    })
                    .then(parsedRes => {
                        dispatch(uiStopLoading());
                        if (!parsedRes.token || !parsedRes.expiresAt) {
                            //dispatch(authSetConnexionError(true,"Une erreur est survenue, merci de réessayer!"));

                        }
                        if (parseInt(parsedRes.status, 10) === 401 || parseInt(
                            parsedRes.status, 10) === 500) {
                            //dispatch(authSetConnexionError(true,"Erreur de login ou de mot de passe, merci de réessayer!"));
                        } else {
                            dispatch(
                                authStoreToken(
                                    parsedRes.token,
                                    authData.username,
                                    parsedRes.expiresAt,
                                    parsedRes.roles
                                )
                            );
                            //history.push("/home");
                        }
                    })
                    .catch(err => {
                        //dispatch(authSetConnexionError(true,"Erreur de connexion, merci de réessayer!"));
                        //dispatch(uiStopLoading());
                    });
                }

                return getState().users.authToken;
            }
        });
    };
};

export const authStoreToken = (token, username, expiresAt, roles) => {
    return dispatch => {
        dispatch(setUsername(username, roles));
        dispatch(authSetToken(token, expiresAt));
        localStorage.setItem("platon:auth:authToken", token);
        localStorage.setItem("platon:auth:username", username);
        localStorage.setItem("platon:auth:authTokenExpirationDate", expiresAt);
        localStorage.setItem("platon:auth:roles", roles);
    };
};

export const setUsername = (username, roles) => {
    return {
        type: AUTH_SET_USERNAME,
        username: username,
        roles: roles
    };
};

export const authSetToken = (token, expiresAt) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiresAt: expiresAt
    };
};

export const authAutoSignIn = (history) => {
    return (dispatch, getState) => {
        dispatch(authGetToken())
        .then(token => {
            if (history) {
                history.push("/home")
            }
        })
        .catch(err => {

        });
    };
};

export const authTokenClearStorage = () => {
    return dispatch => {
        localStorage.removeItem("platon:auth:authToken");
        return localStorage.removeItem("platon:auth:authTokenExpirationDate");
    };
};

export const authLogout = (history) => {
    console.log('loggin out the user');
    return dispatch => {
        dispatch(authRemoveToken());
        dispatch(authRemoveUsername());
        dispatch(authClearStorage())
        .then(() => {
            history.push("/")
        });
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};

export const authRemoveUsername = () => {
    return {
        type: AUTH_REMOVE_USERNAME
    };
};

export const authClearStorage = () => {
    return dispatch => {
        localStorage.removeItem("platon:auth:authToken");
        localStorage.removeItem("platon:auth:authTokenExpirationDate");
        localStorage.removeItem("platon:auth:username");
        return localStorage.removeItem("platon:auth:roles");
    };
};

export const authSetConnexionError = (isConnexionError, connexionErrorMessage,
    errorKey, component) => {
    if (errorKey && component) {

        component.setState(prevState => {
            return {
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [errorKey]: {
                        error: isConnexionError,
                        errorMessage: connexionErrorMessage
                    }
                }
            };
        });

    } else {
        console.log("error and/or component refs are null");
    }

    return {
        type: AUTH_SET_CONNEXION_ERROR,
        isConnexionError: isConnexionError,
        connexionErrorMessage: connexionErrorMessage
    };
};

export const getUserInfos = (history) => {
    return (dispatch, getState) => {
        dispatch(authGetToken())
        .then(token => {
            dispatch(uiStartLoading());
            dispatch(authSetConnexionError(false, ""));
            let url = BASE_URL + "/users/profile";
            console.log("recuperation userInfos")
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            .catch(err => {
                dispatch(authSetConnexionError(true,
                    "Impossible de recuperer les informations de l'utilisateur. Merci de vérifier votre connexion!"));
                dispatch(uiStopLoading());
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else if (parseInt(res.status, 10) === 400) {
                    return res.json();
                } else if (parseInt(res.status, 10) === 401 || parseInt(
                    res.status, 10) === 500) {
                    console.log("erreur 500");
                    return {
                        status: res.status,
                        message: "Erreur 401"
                    };
                } else {
                    throw (new Error(res.status.toString()));
                }
            })
            .then(parsedRes => {
                    dispatch(uiStopLoading());
                    if (parseInt(parsedRes.status, 10) === 400) {
                        dispatch(authSetConnexionError(true, parsedRes.message));
                    } else if (parseInt(parsedRes.status, 10) === 401 || parseInt(
                        parsedRes.status, 10) === 500) {
                        localStorage.removeItem("platon:auth:authToken");
                        console.log("token removed from storage")
                        dispatch(authRemoveToken());
                        console.log("token removed oK")
                        history.push("/")
                    } else {
                        dispatch(authSetConnexionError(false, ""));
                        dispatch(setUserInfos(parsedRes));
                        dispatch(uiStopLoading());
                        console.log(parsedRes)
                        //history.push("/home");
                    }
                }
            )
            .catch(err => {
                //dispatch(authSetConnexionError(true, "Erreur de connexion lors du chargement des stages, merci de réessayer!"));
                //dispatch(uiStopLoading());
            });
        })
        .catch(err => {
            console.log("during during the token fetch");
        });
    };
};

export const setUserInfos = (userInfos) => {
    return {
        type: AUTH_SET_USERINFOS,
        userInfos: userInfos
    };
}

export const modifyUser = (user) => {
    return {
        type: AUTH_MODIFY_USER,
        user: user
    };
}

export const getUsers = (history) => {
    return (dispatch, getState) => {
        dispatch(authGetToken())
        .then(token => {
            dispatch(uiStartLoading());
            dispatch(authSetConnexionError(false, ""));
            let url = BASE_URL + "/users";

            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            .catch(err => {
                dispatch(authSetConnexionError(true,
                    "Impossible de charger les users. Merci de vérifier votre connexion!"));
                dispatch(uiStopLoading());
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else if (parseInt(res.status, 10) === 400) {
                    return res.json();
                } else if (parseInt(res.status, 10) === 401 || parseInt(
                    res.status, 10) === 500) {
                    console.log("erreur 500");
                    return {
                        status: res.status,
                        message: "Erreur 401"
                    };
                } else {
                    throw (new Error(res.status.toString()));
                }
            })
            .then(parsedRes => {
                    dispatch(uiStopLoading());
                    if (parseInt(parsedRes.status, 10) === 400) {
                        dispatch(authSetConnexionError(true, parsedRes.message));
                    } else if (parseInt(parsedRes.status, 10) === 401 || parseInt(
                        parsedRes.status, 10) === 500) {
                        localStorage.removeItem("platon:auth:authToken");
                        console.log("token removed from storage")
                        dispatch(authRemoveToken());
                        console.log("token removed oK")
                        history.push("/")
                    } else {
                        dispatch(authSetConnexionError(false, ""));
                        dispatch(setUsers(parsedRes));
                        dispatch(uiStopLoading());
                        //history.push("/home");
                    }
                }
            )
            .catch(err => {
                //dispatch(authSetConnexionError(true, "Erreur de connexion lors du chargement des stages, merci de réessayer!"));
                //dispatch(uiStopLoading());
            });
        })
        .catch(err => {
            console.log("during during the token fetch");
        });
    };
};

export const setUsers = (users) => {
    return {
        type: AUTH_SET_USERS,
        users: users
    };
}
