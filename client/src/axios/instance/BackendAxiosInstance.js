import axios from 'axios';
import common_util from 'utils/common_util';
import { enqueueSnackbar as enqueueSnackbarAction } from 'store/action/snackbarAction';
import { SNACKBAR_MESSAGE } from 'constants/SnackbarConstants';
import { v1 as uuid } from 'uuid';
import { reduxPersistStore } from 'store/persistStore';

const enqueueSnackbar = (...args) => reduxPersistStore.dispatch(enqueueSnackbarAction(...args));

export const backendAuthApi = axios.create({
  // one minute timeout
  timeout: 60000
});

backendAuthApi.interceptors.request.use((request) => {
  const bearerToken = reduxPersistStore.getState().auth.user.token;
  if (bearerToken) {
    request.headers.Authorization = `Bearer ${bearerToken}`;
  }
  return request;
});

backendAuthApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && !axios.isCancel(error)) {
      let errorMessage = SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.MESSAGE;

      if (error.response) {
        const errorResponse = error.response.data;
        if (!common_util.isUndefinedOrNull(errorResponse.responseMessage)) {
          errorMessage = errorResponse.responseMessage;
        }

        /**
         * Logout user if the response code matches the below mentioned
         * AUTH-002 is returned if user's token is expired
         * AUTH-003 is returned if user's token is invalid
         * AUTH-004 is returned if user is disabled
         */
      }

      enqueueSnackbar({
        message: errorMessage,
        options: {
          key: uuid(),
          variant: SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.VARIANT
        }
      });
    }
    return Promise.reject(error);
  }
);
