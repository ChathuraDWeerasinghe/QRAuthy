import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { VerifyPinView } from '../view/VerifyPinView';
import { useNavigate, useParams } from 'react-router';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import axios from 'axios';
import { backendAuthApi } from '../../../../axios/instance/BackendAxiosInstance';
import { BACKEND_API } from '../../../../axios/constant/BackendApi';
import responseUtil from 'utils/responseUtil';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import authAction from 'store/action/authAction';
import { SNACKBAR_VARIANT } from 'constants/SnackbarConstants';

const VerifyPinController = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const { enqueueSnackbar } = useSnackbar();
  const sourceToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const formik = useFormik({
    initialValues: {
      userPin: ['', '', '', '', '', '']
    },
    onSubmit: (values) => {
      // Handle form submission with PIN value
      const pin = values.userPin.join('');
      verifyPin(pin);
    },
    validate: (values) => {
      const errors = {};

      for (let i = 0; i < values.userPin.length; i++) {
        if (!values.userPin[i]) {
          errors.userPin = 'PIN is required';
          break;
        }
      }

      return errors;
    }
  });

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    formik.setFieldValue(`userPin[${index}]`, value);

    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleResendingPin = async () => {
    await generatePin();
  };

  const verifyPin = async (pin) => {
    if (formik.isValid && formik.dirty) {
      setIsVerifying(true);

      await backendAuthApi({
        url: BACKEND_API.VERIFY_PIN,
        method: 'POST',
        cancelToken: sourceToken.token,
        data: {
          pin: pin,
          userId: params.id
        }
      })
        .then((res) => {
          if (responseUtil.responseIsSuccess(res.data.resCode)) {
            const data = res.data.resData;
            dispatch(authAction.loginUser(data));
            dispatch(authAction.updateLoginStatus());
            setIsVerifying(false);
            navigate(NAVIGATION_ROUTES.dashboard);
          } else {
            formik.resetForm();
            enqueueSnackbar(res.data.resMessage, {
              variant: SNACKBAR_VARIANT.ERROR
            });
          }
        })
        .catch(() => {
          setIsVerifying(false);
        })
        .finally(() => {
          setIsVerifying(false);
        });
    }
  };

  const generatePin = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.GENERATE_PIN,
      method: 'POST',
      cancelToken: sourceToken.token,
      data: {
        userId: params.id
      }
    })
      .then((res) => {
        if (responseUtil.responseIsSuccess(res.data.resCode)) {
          enqueueSnackbar(res.data.resMessage, {
            variant: SNACKBAR_VARIANT.SUCCESS
          });
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
  };

  useEffect(() => {
    if (!params.id) {
      navigate(NAVIGATION_ROUTES.login);
    }

    generatePin();

    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VerifyPinView
      formik={formik}
      handleInputChange={handleInputChange}
      handleResendingPin={handleResendingPin}
      inputRefs={inputRefs}
      isLoading={isLoading}
      isVerifying={isVerifying}
    />
  );
};

export default VerifyPinController;
