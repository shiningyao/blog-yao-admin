import { Reducer, Action } from "redux";

export const breadcrumbs:Reducer<Array<any>, Action<string>> = function(state = [], action) {
    switch(action.type) {
        default:
            return state;
    }
}