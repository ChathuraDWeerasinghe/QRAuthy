import { AUTH_CONSTANT_REDUX } from '../constant/authConstant';

const loginUser = (payload) => {
  return {
    type: AUTH_CONSTANT_REDUX.LOGIN_USER,
    payload
  };
};

const updateLoginStatus = () => {
  return {
    type: AUTH_CONSTANT_REDUX.LOGGED_IN_USER
  };
};

const logoutUser = () => {
  return {
    type: AUTH_CONSTANT_REDUX.LOGOUT_USER
  };
};

const authAction = {
  loginUser,
  updateLoginStatus,
  logoutUser
};

export default authAction;
