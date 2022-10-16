import { USER_ACTIONS } from './actions';

export function userReducer(user = null, action) {
    switch (action.type) {
        case USER_ACTIONS.SET_USER:
            return action.payload;
        case USER_ACTIONS.GET_USER:
            return user;
        case USER_ACTIONS.LOGOUT_USER:
            user = null;
            return user;
        default:
            return user;
    }
}