import { ActionCreator, Action } from "redux";
import { AuthServerProvider } from "@/shared/auth/auth-session";
import { AxiosResponse, AxiosError } from "axios";
import { Dispatch } from "react-redux";
import { AccountProvider } from "@/shared/auth/account";
import principle from '@/shared/auth/principle';

export const AUTHENTICATE = 'authenticate';

export const LOGOUT = 'logout';

export const RECORD_USERINFO = 'recordUserInfo';

export const CHANGE_LANGKEY = 'changeLangKey';

const authServerProvider = new AuthServerProvider();
const accountProvider = new AccountProvider();

export const authenticate: ActionCreator<Action> =  function () {
    return {
        type: AUTHENTICATE
    };
};

export const recordUserInfo: ActionCreator<Action> = function (account) {
    return {
        type: RECORD_USERINFO,
        account
    };
};

export const changeLangKey: ActionCreator<any> = function (key) {
    return function(dispatch: Dispatch) {
        return new Promise((resolve, reject) => {
            principle.identity().subscribe((account) => {
                if(account) {
                    (account as any).langKey = key;
                }
                dispatch(recordUserInfo(account));
                resolve(account);
            });
        });
    }
};

export const identity: ActionCreator<any> = function (force?) {
    return function(dispatch: Dispatch) {
        return new Promise((resolve, reject) => {
            principle.identity(force).subscribe((account) => {
                if(account) {
                    dispatch(authenticate());
                    dispatch(recordUserInfo(account));
                    resolve(account);
                } else {
                    dispatch(logout());
                    resolve(account);
                }
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