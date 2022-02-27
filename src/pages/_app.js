import { useEffect } from 'react';
import { AppProvider } from '../context/appContext/useAppState';
import Layout from '../componentes/layout/Layout';

import Analytics from '../context/analytics/Analytics';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('../../node_modules/bootstrap/dist/js/bootstrap.min.js');
  }, []);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  );
}

export default MyApp;
