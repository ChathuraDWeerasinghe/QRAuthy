import { SNACKBAR_CONST_REDUX } from '../constant/snackbarConstant';

const defaultState = {
    notifications: []
};

const snackbarReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SNACKBAR_CONST_REDUX.ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification
                    }
                ]
            };
        case SNACKBAR_CONST_REDUX.CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map((notification) =>
                    action.dismissAll || notification.key === action.key ? { ...notification, dismissed: true } : { ...notification }
                )
            };
        case SNACKBAR_CONST_REDUX.REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter((notification) => notification.key !== action.key)
            };
        default:
            return state;
    }
};

export default snackbarReducer;
