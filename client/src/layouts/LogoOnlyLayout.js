import { Link as RouterLink, Navigate, Outlet } from "react-router-dom";
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import { useSelector } from "react-redux";
import { NAVIGATION_ROUTES } from "../routes/constant/NavigationRoutes";

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={NAVIGATION_ROUTES.dashboard} />
      ) : (
        <>
          <HeaderStyle>
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </HeaderStyle>
          <Outlet />
        </>
      )}
    </>
  );
}
