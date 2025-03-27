
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './search.module.css'; 

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({ type: '', diet: '', sort: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
              query,
              number: 10,
              offset: (page - 1) * 10,
              apiKey: '91be2dfa1ef5474f8079f82373ef0c5d', 
              ...filters,
            },
          });
          setResults(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [query, filters, page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles.container}>
      <h1>Search results</h1>
      <div className={styles.filters}>
        <select name="type" onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="main course">Main Course</option>
          <option value="dessert">Dessert</option>
        </select>
        <select name="diet" onChange={handleFilterChange}>
          <option value="">All Diets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
        <select name="sort" onChange={handleFilterChange}>
          <option value="">Sort By</option>
          <option value="popularity">Popularity</option>
          <option value="healthiness">Healthiness</option>
        </select>
      </div>
      <div className={styles.grid}>
        {results.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            <img src={recipe.image} alt={recipe.title} className={styles.thumbnail} />
            <h2 className={styles.title}>{recipe.title}</h2>
            <p className={styles.description}>{recipe.summary}</p>
            <a href={`/recipe/${recipe.id}`} className={styles.detailsButton}>More details</a>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Search;
