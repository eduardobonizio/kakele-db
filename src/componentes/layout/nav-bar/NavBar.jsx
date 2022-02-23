import Link from 'next/link';
import { useEffect } from 'react';
import { useAppContext } from '../../../context/appContext/useAppState';
import { navBarJsx as textOptions } from '../../../data/dataLanguages';

// import app from '../../api/Firebase';

function NavBar() {
  const {
    state: { language },
    actions: { changeLanguage },
  } = useAppContext();

  const text = textOptions[language];

  useEffect(() => {
    const userLanguage = localStorage.getItem('language');
    if (userLanguage && userLanguage !== language) {
      changeLanguage(userLanguage);
    }
  }, [changeLanguage, language]);

  return (
    <div
      className="navbar navbar-expand-md navbar-dark bg-dark mb-3"
      id="navbar"
    >
      <div className="container">
        <Link href="/" className="navbar-brand">
          <a className="navbar-brand">Home</a>
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
              <Link href="/set-maker">
                <a className="nav-link">{text.generateSet}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/set">
                <a className="nav-link">{text.showSet}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/ore-calculator">
                <a className="nav-link">{text.oreCalculator}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/search-item">
                <a className="nav-link">{text.searchItem}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/level-calculator">
                <a className="nav-link">{text.levelCalculator}</a>
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
