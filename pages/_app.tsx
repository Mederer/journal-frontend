import UIShell from '@/components/UIShell';
import '@/styles/globals.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import UserContextProvider from '@/context/userContext';

export default function App({ Component, pageProps }: AppProps) {

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#512da8',
      },
      secondary: {
        main: '#f50057',
      },
    },
  })

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Journal App</title>
      </Head>
      <CssBaseline />
      <SWRConfig>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            <UIShell>
              <Component {...pageProps} />
            </UIShell>
          </ThemeProvider>
        </UserContextProvider>

      </SWRConfig>
    </>
  )
}
