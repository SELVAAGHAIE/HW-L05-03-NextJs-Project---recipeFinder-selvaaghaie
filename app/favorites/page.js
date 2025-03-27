
'use client';

import { useEffect, useState } from 'react';
import styles from './favorites.module.css'; 

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.favHead}>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>Your favorites list is empty.</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((recipe) => (
            <div key={recipe.id} className={styles.card}>
              <img src={recipe.image} alt={recipe.title} className={styles.thumbnail} />
              <h2 className={styles.title}>{recipe.title}</h2>
              <button onClick={() => removeFavorite(recipe.id)} className={styles.removeButton}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
