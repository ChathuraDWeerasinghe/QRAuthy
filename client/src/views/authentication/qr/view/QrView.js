import React from 'react';
import { styled } from '@mui/material/styles';
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import { Card, CardContent, Typography, CircularProgress, Container, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const QrView = (props) => {
  const { isLoading, qrImageDataUrl, checkUserStatus, isCheckingStatus } = props;

  const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));

  const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 600,
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

  return (
    <RootStyle title="Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Scan the QR Code
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Card>
            <CardContent style={{ textAlign: 'center' }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {qrImageDataUrl === null ? (
                    <Container>
                      <Typography variant={'h4'}>No QR Found</Typography>
                    </Container>
                  ) : (
                    <>
                      <Stack spacing={2}>
                        <img
                          src={qrImageDataUrl}
                          alt="QR Code"
                          style={{ width: 400, height: 400 }}
                        />
                        <Stack
                          Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="right"
                          sx={{ my: 2 }}
                        >
                          <LoadingButton
                            variant="text"
                            loading={isCheckingStatus}
                            loadingIndicator="Loading…"
                            onClick={() => checkUserStatus()}
                          >
                            Check status
                          </LoadingButton>
                        </Stack>
                      </Stack>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
