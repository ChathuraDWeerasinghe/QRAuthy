import React, { useEffect, useState } from 'react';
import { QrView } from '../view/QrView';
import axios from 'axios';
import { backendAuthApi } from '../../../../axios/instance/BackendAxiosInstance';
import { BACKEND_API } from '../../../../axios/constant/BackendApi';
import responseUtil from 'utils/responseUtil';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import { useSnackbar } from 'notistack';
import { SNACKBAR_VARIANT } from 'constants/SnackbarConstants';
import authAction from 'store/action/authAction';

const QrController = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [qrImageDataUrl, setQrImageDataUrl] = useState(null);

  let sourceToken = axios.CancelToken.source();

  const fetchQr = async () => {
    await backendAuthApi({
      url: BACKEND_API.GENERATE_QR,
      method: 'GET',
      cancelToken: sourceToken.token
    })
      .then((res) => {
        if (responseUtil.responseIsSuccess(res.data.resCode)) {
          setQrImageDataUrl(res.data.resData);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkUserStatus = async () => {
    setIsCheckingStatus(true);

    await backendAuthApi({
      url: BACKEND_API.CHECK_STATUS,
      method: 'GET',
      cancelToken: sourceToken.token
    })
      .then((res) => {
        if (responseUtil.responseIsSuccess(res.data.resCode)) {
          dispatch(authAction.updateLoginStatus());
          setIsCheckingStatus(false);
          navigate(NAVIGATION_ROUTES.dashboard);
        } else {
          enqueueSnackbar(res.data.resMessage, {
            variant: SNACKBAR_VARIANT.INFO
          });
        }
      })
      .catch(() => {
        setIsCheckingStatus(false);
      })
      .finally(() => {
        setIsCheckingStatus(false);
      });
  };

  useEffect(() => {
    fetchQr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QrView
      isLoading={isLoading}
      qrImageDataUrl={qrImageDataUrl}
      checkUserStatus={checkUserStatus}
      isCheckingStatus={isCheckingStatus}
    />
  );
};

export default QrController;
