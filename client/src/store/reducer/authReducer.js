import { AUTH_CONSTANT_REDUX } from '../constant/authConstant';

const initialState = {
  isLoggedIn: false,
  user: {
    id: '',
    token: '',
    mobile: '',
    email: '',
    status: ''
  }
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_CONSTANT_REDUX.LOGIN_USER:
      return {
        initialState: false,
        user: {
          id: payload._id,
          token: payload.userToken,
          email: payload.userEmail,
          mobile: payload.userMobile,
          status: payload.userLoginStatus
        }
      };
    case AUTH_CONSTANT_REDUX.LOGGED_IN_USER:
      return {
        isLoggedIn: true,
        ...state
      };
    case AUTH_CONSTANT_REDUX.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
