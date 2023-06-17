import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Typography, Link } from '@mui/material';
import { FormikProvider } from 'formik';

export const VerifyEmailView = (props) => {
  const { formik, isLoading } = props;
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Enter your email to verify
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="off"
            label="Email address"
            {...getFieldProps('userEmail')}
            error={Boolean(touched.userEmail && errors.userEmail)}
            helperText={touched.userEmail && errors.userEmail}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Verify
        </LoadingButton>
        <Stack direction="row" alignItems="center" justifyContent="right" sx={{ my: 2 }}>
          <Link to="/login" component={RouterLink}>
            <Typography variant="subtitle2" color={'primary'}>
              Remember password? login now
            </Typography>
          </Link>
        </Stack>
      </FormikProvider>
    </>
  );
};
