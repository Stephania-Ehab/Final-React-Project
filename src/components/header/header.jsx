import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import themecontext from '../../context/themeContext';
import languagecontext from '../../context/languagecontext';
import { FaFilm } from 'react-icons/fa'; 
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  const { darkMode, setDarkMode } = useContext(themecontext);
  const { language, setLanguage } = useContext(languagecontext);

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <div className="header-logo">
        <Link to="/"><FaFilm style={{ fontSize: '33px' , color: 'black'}}/></Link>
        <h1 className="navbar-brand">
          <Link to="/">Movie Magic</Link>
        </h1>
        </div>
        <ul className="navbar-links">
          <li>
            <span 
              className="language-toggle" 
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            >
              {language} <span className="icon-chevron">&#9660;</span>
            </span>
          </li>
          <li>
            <Link to="/watch_list">
              <span className="icon-heart">&#9829;</span> WATCHLIST
            </Link>
          </li>
          <li>
            <svg
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "10px",
                transform: `rotateZ(${darkMode ? "180deg" : "0deg"})`,
                cursor: "pointer"
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={() => setDarkMode(!darkMode)}
            >
              <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </svg>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
