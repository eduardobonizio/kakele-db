import styles from './NavBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { navBarJsx as textOptions } from '../../../data/dataLanguages';
import { useRouter } from 'next/router';

// import app from '../../api/Firebase';

function NavBar() {
  const { locale } = useRouter();

  const text = textOptions[locale];

  return (
    <div
      className={`navbar navbar-expand-md navbar-dark bg-dark mb-3 ${styles.navBarContainer}`}
      id="navbar"
    >
      <div className="container">
        <Link href="/" locale={locale}>
          <a className={`navbar-brand ${styles.logo}`}>
            <Image src="/logo.png" alt="logo" width="48" height="48" />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-itens"
          aria-controls="navbar-itens"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbar-itens">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/set-creator" locale={locale}>
                <a className="nav-link">{text.generateSet}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/set-viewer" locale={locale}>
                <a className="nav-link">{text.showSet}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/upgrades" locale={locale}>
                <a className="nav-link">{text.oreCalculator}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/search-item" locale={locale}>
                <a className="nav-link">{text.searchItem}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/experience-calculator" locale={locale}>
                <a className="nav-link">{text.expCalculator}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/wiki" locale={locale}>
                <a className="nav-link">{text.seeItem}</a>
              </Link>
            </li>
          </ul>
          {/* <ul className="navbar-nav">
            {globalUser && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <div>{globalUser.displayName}</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <img
                    src={globalUser.photoURL}
                    alt="User"
                    style={{
                      maxHeight: '40px',
                      borderRadius: '50%',
                    }}
                    className="nav-link"
                  />
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link btn btn-secondary"
                    onClick={() => {
                      app.auth().signOut();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
