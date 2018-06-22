import { ActionCreator } from "redux";

export const AUTHENTICATE = 'authenticate';

export const LOGOUT = 'logout';

export const authenticate: ActionCreator<{type: string}> =  function () {
    return {
        type: AUTHENTICATE
    };
};

export const logout: ActionCreator<{type: string}> = function () {
    return {
        type: LOGOUT
    }
}