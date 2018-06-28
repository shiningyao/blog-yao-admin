import { ActionCreator, Action } from "redux";
import { AuthServerProvider } from "@/shared/auth/auth-session";
import { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "react-redux";
import { AccountProvider } from "@/shared/auth/account";
import principle from '@/shared/auth/principle';
import { resolve } from "dns";
import { rejects } from "assert";

export const AUTHENTICATE = 'authenticate';

export const LOGOUT = 'logout';

export const LOGIN = 'login';

const authServerProvider = new AuthServerProvider();
const accountProvider = new AccountProvider();

export const authenticate: ActionCreator<Action> =  function () {
    return {
        type: AUTHENTICATE
    };
};

export const identity: ActionCreator<any> = function (force?) {
    return function(dispatch: Dispatch) {
        return new Promise((resolve, reject) => {
            principle.identity(force).subscribe((account) => {
                dispatch(authenticate());
                resolve(account);
            });
        });
    }
}

export const logout: ActionCreator<any> = function () {
    return function(dispatch: Dispatch) {
        return authServerProvider.logout()
            .toPromise<AxiosResponse>()
            .then((res) => {
                principle.authenticate(null);
                dispatch({
                    type: LOGOUT
                });
                return res;
            });
    }
}

export const login: ActionCreator<any> = function (credentials, callback?) {
    
    const cb = callback || function() {};

    return function(dispatch: Dispatch) {
        return new Promise((resolve, reject) => {
            authServerProvider.login(credentials).subscribe(() => {
                principle.identity(true).subscribe((account) => {
                    dispatch(authenticate());
                    resolve(account);
                });
                return cb();
            }, (error: AxiosError) => {
                dispatch(logout());
                reject(error);
                return cb(error);
            });
        });
    }

}