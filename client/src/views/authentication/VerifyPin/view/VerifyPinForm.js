import React from 'react';
import { Form, FormikProvider } from 'formik';
import { TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const VerifyPinForm = (props) => {
  const { formik, handleInputChange, handleResendingPin, inputRefs, isLoading, isVerifying } =
    props;

  const { handleSubmit, isSubmitting } = formik;

  const pinList = formik.values.userPin;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack spacing={2} direction={'row'}>
            {pinList.map((value, index) => (
              <TextField
                key={index}
                name={`pin[${index}]`}
                variant="outlined"
                value={value}
                onChange={(event) => handleInputChange(index, event)}
                onBlur={formik.handleBlur}
                error={formik.touched.userPin && formik.errors.userPin}
                helperText={formik.touched.userPin && formik.errors.userPin}
                style={{ width: 60, textAlign: 'center' }}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center' }
                }}
                inputRef={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || isVerifying || isLoading}
          >
            Verify
          </LoadingButton>
          <Stack direction={'row'} alignItems="center" justifyContent="right" sx={{ my: 2 }}>
            <LoadingButton
              size="large"
              variant="contained"
              onClick={() => handleResendingPin()}
              sx={{ width: 'fit-content' }}
              loading={isSubmitting || isVerifying || isLoading}
            >
              Resend PIN
            </LoadingButton>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
};
