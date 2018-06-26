import { ActionCreator, Action } from "redux";
import { AuthServerProvider } from "@/shared/auth/auth-session";
import { AxiosResponse } from "axios";
import { Dispatch } from "react-redux";

export const AUTHENTICATE = 'authenticate';

export const LOGOUT = 'logout';

export const LOGIN = 'login';

const authServerProvider = new AuthServerProvider();

export const authenticate: ActionCreator<Action> =  function () {
    return {
        type: AUTHENTICATE
    };
};

export const logout: ActionCreator<Function> = function () {
    return function(dispatch: Dispatch) {
        return authServerProvider.logout()
            .toPromise<AxiosResponse>()
            .then((res) => {
                dispatch({
                    type: LOGOUT
                });
                return res;
            });
    }
}

export const login: ActionCreator<Function> = function (credentials) {
    return function(dispatch: Dispatch) {
        const loginPromise = authServerProvider.login(credentials).toPromise<AxiosResponse>();
        return loginPromise.then((res) => {
            dispatch(authenticate());
            return res;
        });
    }
    // return {
    //     type: LOGIN,
    //     credentials: credentials
    // }
}