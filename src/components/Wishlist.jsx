import React from 'react';

const Wishlist = ({ movies, onRemoveFromWishlist }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ma Wishlist 🎥</h1>
      {movies.length > 0 ? (
        <ul className="space-y-4">
          {movies.map((movie) => (
            <li key={movie.id} className="border p-4 rounded shadow">
              <h2 className="font-bold">{movie.title}</h2>
              <p>Note: {movie.rating} ⭐</p>
              <button
                onClick={() => onRemoveFromWishlist(movie.id)}
                className="bg-red-500 text-white py-1 px-3 rounded mt-2"
              >
                Retirer de la wishlist
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun film dans la wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;