import { SNACKBAR_VARIANT } from '../constants/SnackbarConstants';

const detectSnackbarAlertVariant = (responseCode = 0) => {
  const responseStatus = responseCode;
  switch (responseStatus) {
    case 1:
      return SNACKBAR_VARIANT.SUCCESS;
    case 0:
      return SNACKBAR_VARIANT.ERROR;
    default:
      return 'default';
  }
};

const responseIsSuccess = (responseCode = null) => {
  const responseStatus = responseCode.slice(-1);
  switch (responseStatus) {
    case '0':
      return true;
    default:
      return false;
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  detectSnackbarAlertVariant,
  responseIsSuccess
};
