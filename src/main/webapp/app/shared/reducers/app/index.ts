import { SET_BREADCRUMBS } from '@/shared/actions';
import { Reducer, Action } from "redux";

export const breadcrumbs:Reducer<Array<any>, Action<string>> = function(state = [], action) {
    switch(action.type) {
        case SET_BREADCRUMBS:
            return (action as any).breadcrumbs;
        default:
            return state;
    }
}