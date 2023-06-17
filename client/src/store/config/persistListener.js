import { getStoredState, REHYDRATE } from 'redux-persist';

export const crossBrowserListener = (store, persistConfig) => {
    return async function () {
        let state = await getStoredState(persistConfig);

        store.dispatch({
            type: REHYDRATE,
            key: persistConfig.key,
            payload: state
        });
    };
};
