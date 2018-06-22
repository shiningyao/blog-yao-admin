import { Reducer, Action, combineReducers } from "redux";
import { AUTHENTICATE, LOGOUT } from "@/shared/actions";

let _isAuthenticated = false;

const isAuthenticated: Reducer<boolean, {
    type: string
}> = function (state = _isAuthenticated, action: Action<string>) {
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

export default combineReducers({
    isAuthenticated
});