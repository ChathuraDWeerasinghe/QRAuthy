import { SkeletonLoadingView } from './SkeletonLoadingView';
import React from 'react';
import { Grid } from '@mui/material';

export const SkeletonLoadingGridView = () => {
    const loadingView = [];
    for (let i = 0; i < 15; i++) {
        loadingView.push(
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}>
                <SkeletonLoadingView />
            </Grid>
        );
    }

    return loadingView;
};
