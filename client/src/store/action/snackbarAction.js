import { SNACKBAR_CONST_REDUX } from '../constant/snackbarConstant';

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: SNACKBAR_CONST_REDUX.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random()
        }
    };
};

export const closeSnackbar = (key) => ({
    type: SNACKBAR_CONST_REDUX.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key
});

export const removeSnackbar = (key) => ({
    type: SNACKBAR_CONST_REDUX.REMOVE_SNACKBAR,
    key
});
