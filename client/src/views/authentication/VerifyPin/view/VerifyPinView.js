import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { VerifyPinForm } from './VerifyPinForm';

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

export const VerifyPinView = (props) => {
  const { formik, handleInputChange, handleResendingPin, inputRefs, isLoading, isVerifying } =
    props;

  return (
    <RootStyle title="Verify Pin">
      <MHidden width="mdDown">
        <SectionStyle>
          <img alt="verify" src="/static/illustrations/illustration_pin.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Pin required:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {isLoading
                ? 'Generating your pin...'
                : 'Enter your unique encrypted code we sent to your email'}
            </Typography>
          </Box>

          <VerifyPinForm
            formik={formik}
            handleInputChange={handleInputChange}
            handleResendingPin={handleResendingPin}
            inputRefs={inputRefs}
            isLoading={isLoading}
            isVerifying={isVerifying}
          />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
