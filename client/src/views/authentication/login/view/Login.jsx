import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography, Link } from '@mui/material';
// layouts
// components
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { LoginForm } from './LoginForm';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export const Login = (props) => {
  const { formik, showPassword, handleShowPassword, isLoading } = props;
  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to QRAuthy
            </Typography>
            <Link to="/register" component={RouterLink}>
              <Typography variant="subtitle2" color={'primary'}>
                Dont have an account? Register now
              </Typography>
            </Link>
          </Stack>

          <LoginForm
            formik={formik}
            showPassword={showPassword}
            handleShowPassword={handleShowPassword}
            isLoading={isLoading}
          />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
