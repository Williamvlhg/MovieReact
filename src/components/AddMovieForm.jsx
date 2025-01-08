import React, { useState } from 'react';

const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert('Le titre est obligatoire!');
    const newMovie = { id: Date.now(), title, rating, comment };
    onAddMovie(newMovie);
    setTitle('');
    setRating(1);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Titre du film"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2 w-full"
        required
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded p-2 w-full"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} étoile{star > 1 && 's'}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Commentaire (facultatif)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Ajouter
      </button>
    </form>
  );
};

export default AddMovieForm;