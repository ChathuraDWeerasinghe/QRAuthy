import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ForgotPwdView } from '../view/ForgotPwdView';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { backendAuthApi } from '../../../../axios/instance/BackendAxiosInstance';
import { BACKEND_API } from '../../../../axios/constant/BackendApi';
import { SNACKBAR_VARIANT } from 'constants/SnackbarConstants';
import responseUtil from 'utils/responseUtil';
import { useNavigate } from 'react-router';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';

const ForgotPwdController = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [steps, setSteps] = useState(0);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResettingPwd, setIsResettingPwd] = useState(false);

  const sourceToken = axios.CancelToken.source();

  const verifyEmailSchema = Yup.object().shape({
    userEmail: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const verifyOtpSchema = Yup.object().shape({
    userOtp: Yup.string().max(6, 'Invalid OTP').required('OTP is required')
  });

  const resetPwdSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'New password must be at least 6 characters long'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formikVerifyEmail = useFormik({
    initialValues: {
      userEmail: ''
    },
    validationSchema: verifyEmailSchema,
    onSubmit: async (values) => {
      await handleVerifyEmail(values);
    }
  });

  const formikVerifyOTP = useFormik({
    initialValues: {
      userOtp: ''
    },
    validationSchema: verifyOtpSchema,
    onSubmit: async (values) => {
      await handleVerifyOtp(values);
    }
  });

  const formikResetPwd = useFormik({
    initialValues: {
      userOtp: ''
    },
    validationSchema: resetPwdSchema,
    onSubmit: async (values) => {
      await handleResetPassword(values);
    }
  });

  const handleVerifyEmail = async (values) => {
    if (formikVerifyEmail.isValid && formikVerifyEmail.dirty) {
      setIsVerifyingEmail(true);

      await backendAuthApi({
        url: BACKEND_API.VERIFY_EMAIL,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: {
          userEmail: values.userEmail
        }
      })
        .then((res) => {
          if (responseUtil.responseIsSuccess(res.data.resCode)) {
            enqueueSnackbar(res.data.resMessage, {
              variant: SNACKBAR_VARIANT.SUCCESS
            });
            setSteps(1);
          } else {
            enqueueSnackbar(res.data.resMessage, {
              variant: SNACKBAR_VARIANT.ERROR
            });
            formikVerifyEmail.resetForm();
          }
        })
        .catch(() => {
          setIsVerifyingEmail(false);
        })
        .finally(() => {
          setIsVerifyingEmail(false);
        });
    }
  };

  const handleVerifyOtp = async (values) => {
    if (formikVerifyOTP.isValid && formikVerifyOTP.dirty) {
      setIsVerifyingOtp(true);

      await backendAuthApi({
        url: BACKEND_API.VERIFY_OTP,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: {
          resetUserPin: values.userOtp,
          userEmail: formikVerifyEmail.values.userEmail
        }
      })
        .then((res) => {
          if (responseUtil.responseIsSuccess(res.data.resCode)) {
            enqueueSnackbar(res.data.resMessage, {
              variant: SNACKBAR_VARIANT.SUCCESS
            });
            setSteps(2);
          } else {
            enqueueSnackbar(res.data.resMessage, {
              variant: SNACKBAR_VARIANT.ERROR
            });
            formikVerifyOTP.resetForm();
          }
        })
        .catch(() => {
          setIsVerifyingOtp(false);
        })
        .finally(() => {
          setIsVerifyingOtp(false);
        });
    }
  };

  const handleResetPassword = async (values) => {
    if (formikResetPwd.isValid && formikResetPwd.dirty) {
      setIsResettingPwd(true);

      await backendAuthApi({
        url: BACKEND_API.RESET_PWD,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: {
          userEmail: formikVerifyEmail.values.userEmail,
          newPassword: values.newPassword
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
            formikResetPwd.resetForm();
          }
        })
        .catch(() => {
          setIsResettingPwd(false);
        })
        .finally(() => {
          setIsResettingPwd(false);
        });
    }
  };

  return (
    <ForgotPwdView
      steps={steps}
      formikVerifyEmail={formikVerifyEmail}
      isVerifyingEmail={isVerifyingEmail}
      formikVerifyOTP={formikVerifyOTP}
      isVerifyingOtp={isVerifyingOtp}
      formikResetPwd={formikResetPwd}
      isResettingPwd={isResettingPwd}
    />
  );
};

export default ForgotPwdController;
