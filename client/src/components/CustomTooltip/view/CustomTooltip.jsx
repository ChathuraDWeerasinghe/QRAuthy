import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Zoom } from '@mui/material';

export const CustomTooltip = (props) => {
  const { children, title } = props;

  return (
    <Tooltip title={title} TransitionComponent={Zoom} arrow>
      {children}
    </Tooltip>
  );
};

CustomTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};
