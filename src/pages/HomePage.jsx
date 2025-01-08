import React, { useState, useEffect } from 'react';
import AddMovieForm from '../components/AddMovieForm';
import MovieList from '../components/MovieList';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';

const HomePage = () => {
  const [tab, setTab] = useState('latest'); 
  const [latestMovies, setLatestMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Pour repérer l'index des films

  const moviesPerPage = 3; // Nombre de film par page

  // Charge les films depuis la localstorage
  useEffect(() => {
    const storedMovies = loadFromLocalStorage('movies');
    const storedWishlist = loadFromLocalStorage('wishlist');
    if (storedMovies) setUserMovies(storedMovies);
    if (storedWishlist) setWishlist(storedWishlist);
  }, []);

  // Récupère les films via API
  useEffect(() => {
    const fetchLatestMovies = async () => {
      const apiKey = '4bc1d0743750583d5a721765acdd1060';
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&page=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setLatestMovies(data.results || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des derniers films :', error);
      }
    };

    fetchLatestMovies();
  }, []);

  // Ajout de film dans la cinémathèque
  const addMovie = (movie) => {
    const updatedMovies = [...userMovies, movie];
    setUserMovies(updatedMovies);
    saveToLocalStorage('movies', updatedMovies);
  };

  // Ajout de film dans la wishlist
  const addToWishlist = (movie) => {
    if (wishlist.find((item) => item.id === movie.id)) return;
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    saveToLocalStorage('wishlist', updatedWishlist);
  };

  // Function pour index de film affiché précèdent
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - moviesPerPage);
    }
  };

  // La meme que la fonction précédente mais affiche les films suivant
  const handleNext = () => {
    if (currentIndex + moviesPerPage < latestMovies.length) {
      setCurrentIndex(currentIndex + moviesPerPage);
    }
  };

  // Affiche les films de l'index actuel
  const currentMovies = latestMovies.slice(
    currentIndex,
    currentIndex + moviesPerPage
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ma Cinémathèque 🎬</h1>

      {/* Bouton pour naviguer entre cinémathèque et Dernier Films*/}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab('latest')}
          className={`py-2 px-4 rounded ${
            tab === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Derniers Films
        </button>
        <button
          onClick={() => setTab('library')}
          className={`py-2 px-4 rounded ${
            tab === 'library' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Ma Cinémathèque
        </button>
      </div>

      {/* Contenu dans chaque sections */}
      {tab === 'latest' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Derniers Films Sortis 🍿</h2>
          {currentMovies.length > 0 ? (
            <div className="relative">
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentMovies.map((movie) => (
                  <li
                    key={movie.id}
                    className="flex flex-col items-center border p-4 rounded shadow bg-white"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      className="w-[50%] h-auto mb-4"
                    />
                    <h3 className="font-bold text-sm text-center">{movie.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                      {movie.overview}
                    </p>
                    <button
                      onClick={() => addToWishlist(movie)}
                      className={`mt-2 py-1 px-3 rounded text-sm ${
                        wishlist.find((item) => item.id === movie.id)
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-green-500 text-white'
                      }`}
                      disabled={wishlist.find((item) => item.id === movie.id)}
                    >
                      {wishlist.find((item) => item.id === movie.id)
                        ? 'Déjà dans la Wishlist'
                        : 'Ajouter à la Wishlist'}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="bg-gray-300 text-gray-800 py-1 px-4 rounded disabled:opacity-50"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex + moviesPerPage >= latestMovies.length}
                  className="bg-gray-300 text-gray-800 py-1 px-4 rounded disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          ) : (
            <p>Chargement des derniers films...</p>
          )}
        </div>
      )}

      {tab === 'library' && (
        <div>
          <AddMovieForm onAddMovie={addMovie} />
          <h2 className="text-xl font-semibold mt-6 mb-4">Ma Cinémathèque 🎥</h2>
          <MovieList movies={userMovies} />
        </div>
      )}
    </div>
  );
};

export default HomePage;