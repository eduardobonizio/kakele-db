import Footer from './footer/Footer';
import NavBar from './nav-bar/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="body-container">{children}</main>
      <Footer />
    </>
  );
}
