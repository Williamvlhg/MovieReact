import React, { useState } from 'react';

const MovieItem = ({ movie, onUpdateMovie, onDeleteMovie }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(movie.title);
  const [newRating, setNewRating] = useState(movie.rating);
  const [newComment, setNewComment] = useState(movie.comment);

  const handleUpdate = () => {
    onUpdateMovie({ ...movie, title: newTitle, rating: newRating, comment: newComment });
    setIsEditing(false);
  };

  return (
    <div className="border p-4 rounded shadow space-y-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="border rounded p-2 w-full"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} étoile{star > 1 && 's'}
              </option>
            ))}
          </select>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white py-1 px-3 rounded">
            Enregistrer
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white py-1 px-3 rounded">
            Annuler
          </button>
        </>
      ) : (
        <>
          <h2 className="font-bold">{movie.title}</h2>
          <p>Note: {movie.rating} ⭐</p>
          {movie.comment && <p>Commentaire: {movie.comment}</p>}
          <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white py-1 px-3 rounded">
            Modifier
          </button>
          <button onClick={() => onDeleteMovie(movie.id)} className="bg-red-500 text-white py-1 px-3 rounded">
            Supprimer
          </button>
        </>
      )}
    </div>
  );
};

export default MovieItem;