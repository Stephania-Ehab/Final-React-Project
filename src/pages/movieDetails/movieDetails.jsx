import React, { useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaStar, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';
import languageContext from '../../context/languagecontext';
import themeContext from '../../context/themeContext';
import './movieDetails.css';

const API_KEY = 'e10f4d41a7ba667c6c165f0d681ffd36';
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const {darkMode}= useContext(themeContext)
  const {language} = useContext(languageContext)
   

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
        setMovie(response.data);
        checkWatchlist(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
          params: {
            api_key: API_KEY,
          },
        });
        setRecommendations(response.data.results);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchMovieDetails();
    fetchRecommendations();
  }, [id]);

  const checkWatchlist = (movie) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setIsInWatchlist(watchlist.some(item => item.id === movie.id));
  };

  const handleWatchlistToggle = () => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (isInWatchlist) {
      watchlist = watchlist.filter(item => item.id !== movie.id);
      setIsInWatchlist(false);
    } else {
      watchlist.push(movie);
      setIsInWatchlist(true);
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={`mt-3 p-3 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
    <div dir={language === "en" ? "ltr" : "rtl"}>
    <div className="movie-details-page">
      <div className="movie-header">
        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movieInfo">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-meta">
            <span className="movie-ratings"><FaStar /> {movie.vote_average}</span>
            <span className="movie-release-date">{movie.release_date}</span>
            <button
              className={`movie-favorite-icon ${isInWatchlist ? 'active' : ''}`}
              onClick={handleWatchlistToggle}
              aria-label={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              <FaHeart />
            </button>
          </div>
          <p className="movie-description">{movie.overview}</p>
          <div className="movie-genres">
            {movie.genres.map(genre => (
              <span key={genre.id} className="movie-genre">{genre.name}</span>
            ))}
          </div>
          <p className="movie-duration">Duration: {movie.runtime} minutes</p>
          <p className="movie-language">Language: {movie.original_language.toUpperCase()}</p>
          {movie.production_companies.length > 0 && (
            <img
              className="movie-production-logo"
              src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0]?.logo_path}`}
              alt={movie.production_companies[0]?.name}
            />
          )}
          <a className="movie-website" href={movie.homepage} target="_blank" rel="noopener noreferrer">
            Website <FaExternalLinkAlt />
          </a>
        </div>
      </div>

      <h2 className="recommendations-title">Recommendations</h2>
      <div className="recommendations">
        {recommendations.map(rec => (
          <div key={rec.id} className="recommendation-card">
            <img
              className="recommendation-poster"
              src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
              alt={rec.title}
            />
            <div className="recommendation-info">
              <h3 className="recommendation-title">{rec.title}</h3>
              <p className="recommendation-rating"><FaStar /> {rec.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
        </div>
        </div>
    </div>
  );
}

export default MovieDetailsPage;

