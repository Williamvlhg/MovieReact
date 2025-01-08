import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies, onDeleteMovie }) => {
  return (
    <div className="space-y-4">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onDeleteMovie={onDeleteMovie}
          />
        ))
      ) : (
        <p>Aucun film ajouté dans votre cinémathèque.</p>
      )}
    </div>
  );
};

export default MovieList;