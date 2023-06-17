import React, { useState } from 'react';
import { PasswordFieldView } from '../view/PasswordFieldView';

const PasswordFieldController = (props) => {
  const { name, value, touched, errors, label, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <PasswordFieldView
      showPassword={showPassword}
      name={name}
      value={value}
      handleShowPassword={handleShowPassword}
      touched={touched}
      errors={errors}
      label={label}
      {...rest}
    />
  );
};

export default PasswordFieldController;
