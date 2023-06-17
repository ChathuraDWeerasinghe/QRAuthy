import React from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { FormikProvider } from 'formik';
import { PasswordField } from 'components/PasswordField';

export const ResetPwdView = (props) => {
  const { formik, isLoading } = props;
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Enter your new password
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <PasswordField
            fullWidth
            autoComplete="off"
            label="New Password"
            {...getFieldProps('newPassword')}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />
          <PasswordField
            fullWidth
            autoComplete="off"
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
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
          Confirm
        </LoadingButton>
      </FormikProvider>
    </>
  );
};
