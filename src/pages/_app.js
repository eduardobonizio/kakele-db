import { AppProvider } from '../componentes/useAppState';
import Layout from '../componentes/Layout';
import Script from 'next/script';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </>
  );
}

export default MyApp;
