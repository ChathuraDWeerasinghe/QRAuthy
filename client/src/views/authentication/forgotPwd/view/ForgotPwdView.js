import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Container } from '@mui/material';
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { VerifyEmailView } from '../components/VerifyEmailView';
import { VerifyOtpView } from '../components/VerifyOtpView';
import { ResetPwdView } from '../components/ResetPwdView';

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

export const ForgotPwdView = (props) => {
  const {
    steps,
    formikVerifyEmail,
    formikVerifyOTP,
    formikResetPwd,
    isVerifyingEmail,
    isVerifyingOtp,
    isResettingPwd
  } = props;

  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/illustrations/illustration_forgot_password.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          {steps === 0 ? (
            <VerifyEmailView formik={formikVerifyEmail} isLoading={isVerifyingEmail} />
          ) : null}
          {steps === 1 ? (
            <VerifyOtpView formik={formikVerifyOTP} isLoading={isVerifyingOtp} />
          ) : null}
          {steps === 2 ? <ResetPwdView formik={formikResetPwd} isLoading={isResettingPwd} /> : null}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
