import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

export const PasswordFieldView = (props) => {
  const { showPassword, handleShowPassword, label, ...rest } = props;

  return (
    <TextField
      fullWidth
      autoComplete="current-password"
      type={showPassword ? 'text' : 'password'}
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword} edge="end">
              <Icon icon={showPassword ? eyeFill : eyeOffFill} />
            </IconButton>
          </InputAdornment>
        )
      }}
      {...rest}
    />
  );
};
