import React from 'react';

const FilterAndSort = ({ onFilter, onSort }) => {
  const [filterRating, setFilterRating] = React.useState('');
  const [sortOption, setSortOption] = React.useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterRating(value);
    onFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onSort(value);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <label htmlFor="filter" className="mr-2">Filtrer par note :</label>
        <select
          id="filter"
          value={filterRating}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">Toutes</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} étoile{star > 1 && 's'} ou plus
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sort" className="mr-2">Trier par :</label>
        <select
          id="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="border rounded p-2"
        >
          <option value="">Aucun</option>
          <option value="title">Titre (A-Z)</option>
          <option value="rating">Note (5-1)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSort;