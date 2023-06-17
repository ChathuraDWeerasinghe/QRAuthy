import React from 'react';
// material
import { Grid } from '@mui/material';
// components
import Page from 'components/Page';
import { useTheme } from '@mui/styles';

export const DashboardApp = () => {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <Grid
        container
        spacing={1}
        maxWidth="xl"
        style={{ backgroundColor: theme.palette.grey[200] }}
      >
        <Grid item xl={12} sm={12}>
          Dashboard
        </Grid>
      </Grid>
    </Page>
  );
};
