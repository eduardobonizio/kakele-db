import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

// import app from '../../api/Firebase';
import { navBarJsx as textOptions } from "../data/dataLanguages";

function NavBar() {
  const { language } = useSelector((state) => state.currentKakeleFilters);
  const text = textOptions[language] || textOptions.PTBR;

  return (
    <div
      className="navbar navbar-expand-md navbar-dark bg-dark mb-3"
      id="navbar"
    >
      <div className="container">
        <Link href="/" className="navbar-brand">
          Home
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
              <Link href="/set-maker" className="nav-link">
                {text.generateSet}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/set" className="nav-link">
                {text.showSet}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/ore-calculator" className="nav-link">
                {text.oreCalculator}
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/search-item" className="nav-link">
                {text.searchItem}
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