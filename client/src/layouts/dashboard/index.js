import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { NAVIGATION_ROUTES } from 'routes/constant/NavigationRoutes';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <RootStyle>
      {isLoggedIn ? (
        <>
          <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
          <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
          <MainStyle>
            <Outlet />
          </MainStyle>
        </>
      ) : (
        <Navigate to={NAVIGATION_ROUTES.login} />
      )}
    </RootStyle>
  );
}
