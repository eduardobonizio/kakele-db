import Footer from './Footer';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="body-container">{children}</main>
      <Footer />
    </>
  );
}
