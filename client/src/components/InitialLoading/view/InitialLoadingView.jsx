import React from 'react';

import { useStyles } from '../style/InitialLoadingStyle';
import PropTypes from 'prop-types';
import { Backdrop, CircularProgress } from '@mui/material';

export const InitialLoadingView = ({ isOpen = false }) => {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={isOpen}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

InitialLoadingView.propTypes = {
    isOpen: PropTypes.bool
};
