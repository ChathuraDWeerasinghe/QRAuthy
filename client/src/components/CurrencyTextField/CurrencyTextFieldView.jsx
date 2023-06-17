import React from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

export const CurrencyTextFieldView = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      decimalScale={2}
      fixedDecimalScale={true}
      // TODO Will be fixed in future after currency is added
      prefix={'USD '}
      // prefix={`${useSelector(
      //   (state) => state.userProfileReducer.userDetails.currency
      // )} `}
    />
  );
};

CurrencyTextFieldView.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
