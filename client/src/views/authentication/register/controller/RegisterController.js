import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Register from '../view/Register';
import axios from 'axios';
import { backendAuthApi } from '../../../../axios/instance/BackendAxiosInstance';
import { BACKEND_API } from '../../../../axios/constant/BackendApi';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import responseUtil from 'utils/responseUtil';
import { useSnackbar } from 'notistack';
import { SNACKBAR_VARIANT } from 'constants/SnackbarConstants';

const RegisterController = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let sourceToken = axios.CancelToken.source();

  const RegisterSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    userMobile: Yup.string()
      .matches(/^[0-9]{2}\s[0-9]{3}\s[0-9]{4}$/, 'Invalid mobile number')
      .required('Mobile number is required'),
    userPassword: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      userEmail: '',
      userMobile: '',
      userPassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      handleRegister();
    }
  });

  const handleRegister = async () => {
    if (formik.isValid && formik.dirty) {
      setIsLoading(true);

      await backendAuthApi({
        url: BACKEND_API.SIGNUP,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: {
          userEmail: formik.values.userEmail,
          userMobile: formik.values.userMobile,
          userPassword: formik.values.userPassword
        }
      })
        .then((res) => {
          if (responseUtil.responseIsSuccess(res.data.resCode)) {
            enqueueSnackbar(res.data.resMessage, {
              variant: SNACKBAR_VARIANT.SUCCESS
            });
            navigate(NAVIGATION_ROUTES.login);
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
    <Register
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formik={formik}
      isLoading={isLoading}
    />
  );
};

export default RegisterController;
