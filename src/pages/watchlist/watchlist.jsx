// import React from 'react';
// import { Link } from 'react-router-dom';
// import MovieCard from '../../components/movieCard/movieCard';
// import './watchlist.css'

// function WatchListPage() {
//   const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

//   return (
//     <div>
//       <h1>My Watchlist</h1>
//       {watchlist.length > 0 ? (
//         <div className="movie-list">
//           {watchlist.map(movie => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>
//       ) : (
//         <div className="watchlist-empty">
//         <h2>Watch list</h2>
//         <div className="empty-state">
//           <div className="empty-icon">
//           <svg xmlns="http://www.w3.org/2000/svg" 
//           viewBox="0 0 576 512">
//           <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6l0-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1l0 5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm59.3-180.7L454.6 368l36.7 36.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L432 390.6l-36.7 36.7c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L409.4 368l-36.7-36.7c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L432 345.4l36.7-36.7c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
//           </div>
//           <p>No Movies in watch list</p>
//           <Link to="/">
//             <button className="back-to-home">Back to home</button>
//           </Link>
//         </div>
//       </div>
//       )}
//     </div>
//   );
// }

// export default WatchListPage;
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
                {/* Render the rating in stars */}
                {Array(Math.floor(movie.vote_average / 2)).fill().map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} color="#ffcc00" />
                ))}
                {/* Render half star if needed */}
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
