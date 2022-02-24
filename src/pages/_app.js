import Head from 'next/head';
import { useEffect } from 'react';
import { AppProvider } from '../context/appContext/useAppState';
import Layout from '../componentes/layout/Layout';

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
        <meta
          name="description"
          content="Tools for Kakele including auto set generator, manual set generator, create and share sets with your friends. Also exp calculator, upgrade calculator and items informations"
        />
        <meta property="og:title" content="Kakele Tools" key="title" />
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
