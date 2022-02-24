import { useEffect } from 'react';
import { AppProvider } from '../context/appContext/useAppState';
import Layout from '../componentes/layout/Layout';

import Analytics from '../context/analytics/Analytics';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('../../node_modules/bootstrap/dist/js/bootstrap.min.js');
  }, []);

  return (
    <>
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
