import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/movieCard/movieCard';
import Pagination from '../../components/pagination/pagination';
import languageContext from '../../context/languagecontext';
import themeContext from '../../context/themeContext';
import './home.css'

const API_KEY = 'e10f4d41a7ba667c6c165f0d681ffd36';
const BASE_URL = 'https://api.themoviedb.org/3';

// function Home() {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const response = await axios.get(`${BASE_URL}/movie/popular`, {
//         params: {
//           api_key: API_KEY,
//           page: page,
//           query: searchTerm,
//         },
//       });
//       setMovies(response.data.results);
//     };

//     fetchMovies();
//   }, [page, searchTerm]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for a movie..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="movie-list">
//         {movies.map((movie) => (
//           <Link key={movie.id} to={`/movie/${movie.id}`}>
//             <MovieCard movie={movie} />
//           </Link>
//         ))}
//       </div>
//       <Pagination page={page} setPage={setPage} />
//     </div>
//   );
// }

// export default Home;
function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const {darkMode}= useContext(themeContext)
  const {language} = useContext(languageContext)

  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint = searchTerm ? 'search/movie' : 'movie/popular';
      const response = await axios.get(`${BASE_URL}/${endpoint}`, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
          page: page,
        },
      });
      setMovies(response.data.results);
    };

    fetchMovies();
  }, [page, searchTerm]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1); // Reset to the first page when a new search is performed
  };

  return (
    <div className={`mt-3 p-3 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
    <div dir={language === "en" ? "ltr" : "rtl"}>
    <div className="home-page">
      <header className="header">
        <h1>Welcome to our movie app</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search and explore..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </header>

      <section className="popular-movies">
        <h2>{searchTerm ? 'Search Results' : 'Popular Movies'}</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            
              <MovieCard key={movie.id} movie={movie} />
        
          ))}
        </div>
        <Pagination page={page} setPage={setPage} />
      </section>
    </div>
    </div>
    </div>
  );
  // const [movies, setMovies] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const response = await axios.get(`${BASE_URL}/movie/popular`, {
  //       params: {
  //         api_key: API_KEY,
  //         page: page,
  //         query: searchTerm,
  //       },
  //     });
  //     setMovies(response.data.results);
  //   };

  //   fetchMovies();
  // }, [page, searchTerm]);

  // return (
  //   <div className="home-page">
  //     <header className="header">
  //       <h1>Welcome to our movie app</h1>
  //       <p>Millions of movies, TV shows and people to discover. Explore now.</p>
  //       <input
  //         type="text"
  //         placeholder="Search and explore..."
  //         value={searchTerm}
  //         onChange={(e) => setSearchTerm(e.target.value)}
  //       />
  //       <button className="search-button">Search</button>
  //     </header>

  //     <section className="popular-movies">
  //       <h2>Popular Movies</h2>
  //       <div className="movie-list">
  //         {movies.map((movie) => (
  //           <Link key={movie.id} to={`/movie/${movie.id}`}>
  //             <MovieCard movie={movie} />
  //           </Link>
  //         ))}
  //       </div>
  //       <Pagination page={page} setPage={setPage} />
  //     </section>
  //   </div>
  // );
}

export default Home;
