import React from 'react';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import { Login, Register, QrView, VerifyPin, ForgotPassword } from '../views';
import NotFound from '../views/notFound/Page404';
import { NAVIGATION_ROUTES } from './constant/NavigationRoutes';
import { Navigate } from 'react-router-dom';

const AuthenticationRoutes = {
  path: '/',
  element: <LogoOnlyLayout />,
  children: [
    { path: NAVIGATION_ROUTES.login, element: <Login /> },
    { path: NAVIGATION_ROUTES.register, element: <Register /> },
    { path: NAVIGATION_ROUTES.qr, element: <QrView /> },
    { path: NAVIGATION_ROUTES.verifyPin, element: <VerifyPin /> },
    { path: NAVIGATION_ROUTES.forgotPwd, element: <ForgotPassword /> },
    { path: NAVIGATION_ROUTES.notFound, element: <NotFound /> },
    { path: '*', element: <Navigate to={NAVIGATION_ROUTES.notFound} replace /> }
  ]
};

export default AuthenticationRoutes;
