import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { SnackbarProvider } from 'notistack';

import { UIProvider } from '../context/UI';
import { EntriesProvider } from '../context/entries';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
