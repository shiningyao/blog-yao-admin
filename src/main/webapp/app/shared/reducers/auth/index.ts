import { Reducer, Action, combineReducers } from "redux";
import { AUTHENTICATE, LOGOUT, LOGIN } from "@/shared/actions";
import principle from "@/shared/auth/principle";

let _isAuthenticated = principle.isAuthenticated();

export const isAuthenticated: Reducer<boolean, Action<string>> = function (state = _isAuthenticated, action) {
    switch(action.type) {
        case AUTHENTICATE: 
            _isAuthenticated = true;
            return principle.isAuthenticated();
        case LOGOUT:
            _isAuthenticated = false;
            return principle.isAuthenticated();
        default:
            return _isAuthenticated;
    }
}