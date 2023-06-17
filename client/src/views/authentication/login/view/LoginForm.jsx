import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment, Typography, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export const LoginForm = (props) => {
  const { formik, showPassword, handleShowPassword, isLoading } = props;

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="off"
          type="email"
          label="Email address"
          {...getFieldProps('userEmail')}
          error={Boolean(touched.userEmail && errors.userEmail)}
          helperText={touched.userEmail && errors.userEmail}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...getFieldProps('userPassword')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
          error={Boolean(touched.userPassword && errors.userPassword)}
          helperText={touched.userPassword && errors.userPassword}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="right" sx={{ my: 2 }}>
        <Link to="/forgotPwd" component={RouterLink}>
          <Typography variant="subtitle2" color={'primary'}>
            Forgot password? Reset now
          </Typography>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </FormikProvider>
  );
};
