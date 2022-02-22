import { Provider } from "react-redux";
import Layout from "../componentes/Layout";
import store from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
