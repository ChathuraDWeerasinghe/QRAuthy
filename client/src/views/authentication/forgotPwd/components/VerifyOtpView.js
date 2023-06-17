import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Typography } from '@mui/material';
import { FormikProvider } from 'formik';

export const VerifyOtpView = (props) => {
  const { formik, isLoading } = props;
  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Pin Required:
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>Check your email for the OTP</Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="off"
            label="One Time Password"
            {...getFieldProps('userOtp')}
            error={Boolean(touched.userOtp && errors.userOtp)}
            helperText={touched.userOtp && errors.userOtp}
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
      </FormikProvider>
    </>
  );
};
