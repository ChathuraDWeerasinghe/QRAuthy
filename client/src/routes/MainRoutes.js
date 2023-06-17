import React from 'react';
import DashboardLayout from '../layouts/dashboard';
import { DashboardApp } from '../views';
import { NAVIGATION_ROUTES } from './constant/NavigationRoutes';

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    { path: '/', element: <DashboardApp /> },
    { path: NAVIGATION_ROUTES.dashboard, element: <DashboardApp /> }
  ]
};

export default MainRoutes;
