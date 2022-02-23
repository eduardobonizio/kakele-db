import { useEffect } from 'react';
import { AppProvider } from '../context/appContext/useAppState';
import Layout from '../componentes/layout/Layout';
import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('../../node_modules/bootstrap/dist/js/bootstrap.min.js');
  }, []);
  return (
    <>
      <Head>
        <title>Kakele Tools</title>
      </Head>

      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}

export default MyApp;
