import {
    AUTH_MODIFY_USER,
    AUTH_REMOVE_TOKEN,
    AUTH_REMOVE_USERNAME,
    AUTH_SET_CONNEXION_ERROR,
    AUTH_SET_TOKEN,
    AUTH_SET_USERINFOS,
    AUTH_SET_USERNAME,
    AUTH_SET_USERS,
} from "../actions/actionTypes";

const initialState = {
    users: null,
    authToken: null,
    authTokenExpirationDate: null,
    roles: null,
    isConnexionError: false,
    connexionErrorMessage: "pas d'erreur",
    userInfos: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                authToken: action.token,
                authTokenExpirationDate: action.expiresAt
            };
        case AUTH_SET_USERNAME:
            return {
                ...state,
                username: action.username,
                roles: action.roles
            };
        case AUTH_REMOVE_USERNAME:
            return {
                ...state,
                username: ""
            };
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                authToken: null,
                authTokenExpirationDate: null
            };
        case AUTH_SET_CONNEXION_ERROR:
            return {
                ...state,
                isConnexionError: action.isConnexionError,
                connexionErrorMessage: action.connexionErrorMessage
            };
        case AUTH_SET_USERINFOS:
            return {
                ...state,
                userInfos: action.userInfos,
            };

        case AUTH_SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case AUTH_MODIFY_USER:
            return {
                ...state,
                users: [...state.users.filter((user) => {
                    return user.idUser !== action.user.idUser
                }), action.user],
            };
        default:
            return state;
    }
};
export default reducer;