import { Reducer, Action, combineReducers } from "redux";
import { AUTHENTICATE, LOGOUT, LOGIN } from "@/shared/actions";
import { AuthServerProvider } from "@/shared/auth/auth-session";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

let _isAuthenticated = false;

export const isAuthenticated: Reducer<boolean, Action<string>> = function (state = _isAuthenticated, action) {
    switch(action.type) {
        case AUTHENTICATE: 
            _isAuthenticated = true;
            return true;
        case LOGOUT:
            _isAuthenticated = false;
            return false;
        default:
            return _isAuthenticated;
    }
}