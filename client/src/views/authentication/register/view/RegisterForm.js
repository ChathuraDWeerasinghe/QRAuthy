import React from 'react';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ReactInputMask from 'react-input-mask';

export const RegisterForm = (props) => {
  const { formik, showPassword, setShowPassword } = props;

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('userEmail')}
            error={Boolean(touched.userEmail && errors.userEmail)}
            helperText={touched.userEmail && errors.userEmail}
          />
          <ReactInputMask mask="99 999 9999" maskChar=" " {...getFieldProps('userMobile')}>
            {(inputProps) => (
              <TextField
                {...inputProps}
                label="Mobile Number"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">+94 </InputAdornment>
                }}
                error={formik.touched.userMobile && formik.errors.userMobile}
                helperText={formik.touched.userMobile && formik.errors.userMobile}
              />
            )}
          </ReactInputMask>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('userPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.userPassword && errors.userPassword)}
            helperText={touched.userPassword && errors.userPassword}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};
