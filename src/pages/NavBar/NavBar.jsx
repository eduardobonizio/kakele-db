/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import app from '../../api/Firebase';

function NavBar() {
  const globalUser = useSelector(state => state.globalUser);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="navbar navbar-expand-md navbar-dark bg-dark" id="navbar">
      <div className="container py-3">
        <Link className="navbar-brand" to="/">
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
              <a href="/game" className="nav-link">
                Quizz
              </a>
            </li>
            <li className="nav-item">
              <a href="/30-dias-css" className="nav-link">
                Desafio CSS
              </a>
            </li>
            <li className="nav-item">
              <a href="/github-pages-react" className="nav-link">
                Github pages com react
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {globalUser && (
              <>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <div>{globalUser.displayName}</div>
                  </a>
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
                    className="nav-link"
                    type="button"
                    onClick={() => {
                      app.auth().signOut();
                    }}
                    style={{
                      maxHeight: '40px',
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
