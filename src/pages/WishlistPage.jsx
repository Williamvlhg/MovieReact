import React from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorageUtils';

const WishlistPage = () => {
  const [wishlist, setWishlist] = React.useState([]);

  // Charger la wishlist depuis le localStorage
  React.useEffect(() => {
    const storedWishlist = loadFromLocalStorage('wishlist');
    if (storedWishlist) setWishlist(storedWishlist);
  }, []);

  // Supprimer un film de la wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((movie) => movie.id !== id);
    setWishlist(updatedWishlist);
    saveToLocalStorage('wishlist', updatedWishlist);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ma Wishlist 🎥</h1>
      {wishlist.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((movie) => (
            <li key={movie.id} className="flex flex-col items-center border p-4 rounded shadow bg-white">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-[50%] h-auto mb-4"
              />
              <h3 className="font-bold text-sm text-center">{movie.title}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-3">{movie.overview}</p>
              <button
                onClick={() => removeFromWishlist(movie.id)}
                className="bg-red-500 text-white py-1 px-3 rounded text-sm mt-2"
              >
                Supprimer de la Wishlist
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Votre wishlist est vide.</p>
      )}
    </div>
  );
};

export default WishlistPage;