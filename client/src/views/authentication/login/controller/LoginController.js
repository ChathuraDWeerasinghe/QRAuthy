import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Login } from '../view/Login';
import axios from 'axios';
import { backendAuthApi } from '../../../../axios/instance/BackendAxiosInstance';
import { BACKEND_API } from '../../../../axios/constant/BackendApi';
import responseUtil from 'utils/responseUtil';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import { SNACKBAR_VARIANT } from 'constants/SnackbarConstants';
import authAction from 'store/action/authAction';

const LoginController = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let sourceToken = axios.CancelToken.source();

  const LoginSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    userPassword: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userPassword: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await handleSignIn(values);
    }
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSignIn = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);

      await backendAuthApi({
        method: 'POST',
        url: BACKEND_API.LOGIN,
        cancelToken: sourceToken.token,
        data: {
          userEmail: formik.values.userEmail,
          userPassword: formik.values.userPassword
        }
      })
        .then((res) => {
          if (responseUtil.responseIsSuccess(res.data.resCode)) {
            const data = res.data.resData;
            dispatch(authAction.loginUser(data));
            navigate(NAVIGATION_ROUTES.qr);
          } else {
            enqueueSnackbar(res.data.resMessage, {
              variant: SNACKBAR_VARIANT.ERROR
            });
          }
        })
        .catch(() => {
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Login
      formik={formik}
      showPassword={showPassword}
      handleShowPassword={handleShowPassword}
      isLoading={isLoading}
    />
  );
};

export default LoginController;
