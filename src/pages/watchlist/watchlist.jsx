import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-regular-svg-icons';
import languageContext from '../../context/languagecontext';
import themeContext from '../../context/themeContext';
import './watchlist.css';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const {darkMode}= useContext(themeContext)
  const {language} = useContext(languageContext)

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(savedWatchlist);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  if (watchlist.length === 0) {
    return (
      <div className="empty-watchlist">
        <div className="empty-content">
          <FontAwesomeIcon icon={faHeartCircleMinus} size="5x" color="#ccc" />
          <h2>No Movies in watch list</h2>
          <Link to="/" className="back-home-button">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-3 p-3 ${darkMode ? "dark text-light" : "bg-light"}`}>
    <div dir={language === "en" ? "ltr" : "rtl"}>
    <div className="watchlist-container">
      {watchlist.map(movie => (
        <div className="movieCard" key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="moviePoster"
            />
          </Link>
          <div className="MoviesInfo">
            <h3>{movie.title}</h3>
            <p>{new Date(movie.release_date).toLocaleDateString()}</p>
            <div className="rating-heart">
              <div className="rating-stars">
                {Array(Math.floor(movie.vote_average / 2)).fill().map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} color="#ffcc00" />
                ))}
                {movie.vote_average % 2 !== 0 && (
                  <FontAwesomeIcon icon={faStarHalfAlt} color="#ffcc00" />
                )}
              </div>
              <span className="rating">{movie.vote_count}</span>
            </div>
            <p className="movie-overview">{movie.overview.substring(0, 150)}...</p>
            <button
              className="heart-button"
              onClick={() => removeFromWatchlist(movie.id)}
            >
              <FontAwesomeIcon icon={solidHeart} color="#ff6b6b" />
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
  );
}

export default Watchlist;
