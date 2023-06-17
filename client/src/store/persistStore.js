import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducer/authReducer';
import snackbarReducer from './reducer/snackbarReducer';
import { crossBrowserListener } from './config/persistListener';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { composeWithDevTools } from 'redux-devtools-extension';

const allPersistReducers = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
});

const encryptor = encryptTransform({
  secretKey: "asdasdadasd",
  onError: function (error) {
    // Handle the error.
  }
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['snackbarReducer'],
  transforms: [encryptor]
};

const persistedReducer = persistReducer(persistConfig, allPersistReducers);

export const reduxPersistStore = createStore(persistedReducer, composeWithDevTools());

window.addEventListener('storage', crossBrowserListener(reduxPersistStore, persistConfig));

export const persistedStore = persistStore(reduxPersistStore);
