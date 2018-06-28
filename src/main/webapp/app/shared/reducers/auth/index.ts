import { RECORD_USERINFO } from './../../actions/index';
import { Reducer, Action, combineReducers } from "redux";
import { AUTHENTICATE, LOGOUT } from "@/shared/actions";
import principle from "@/shared/auth/principle";

let _isAuthenticated = principle.isAuthenticated();
let _userInfo = null;

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
};

export const userInfo: Reducer<Account, {
    type: string,
    account: Account
}> = function(state = _userInfo, action) {
    switch(action.type) {
        case RECORD_USERINFO:
            _userInfo = action.account;
            return Object.assign({}, _userInfo);
        default:
            return state;
    }
};