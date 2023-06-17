import React from 'react';
import Routes from '../src/routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './components/ScrollToTop';
import SnackbarNotifier from './common/service/SnackbarNotifier';

import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

// Dismiss Action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeConfig>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          dense
          preventDuplicate
          ref={notistackRef}
          action={(key) => (
            <IconButton aria-label="dismiss" size="small" onClick={onClickDismiss(key)}>
              <CloseIcon fontSize="inherit" color={'action'} />
            </IconButton>
          )}
        >
          <SnackbarNotifier />
          <ScrollToTop />
          <GlobalStyles />
          <Routes />
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
      </QueryClientProvider>
    </ThemeConfig>
  );
};

export default App;
