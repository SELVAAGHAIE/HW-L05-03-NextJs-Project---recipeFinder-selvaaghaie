
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import styles from './recipe.module.css';

const RecipeDetail = () => {
  const params = useParams();
  const { id } = params;
  const [recipe, setRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
              apiKey: '91be2dfa1ef5474f8079f82373ef0c5d',
            },
          });
          setRecipe(response.data);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const saveToFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!savedFavorites.some((fav) => fav.id === recipe.id)) {
      savedFavorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      setFavorites(savedFavorites);
    }
  };

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
      <h1 className={styles.title}>{recipe.title}</h1>
      <div className={styles.section}>
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h2>Steps</h2>
        <ol>
          {recipe.analyzedInstructions[0].steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
      </div>
      <div className={styles.section}>
        <h2>Additional Information</h2>
        <p>Cooking Time: {recipe.readyInMinutes} minutes</p>
        <p>Servings: {recipe.servings}</p>
        <p>{recipe.summary}</p>
      </div>
      <button onClick={saveToFavorites} className={styles.saveButton}>Save to Favorites</button>
      <div className={styles.favoritesSection}>
        <h2>Favorites</h2>
        <div className={styles.favoritesGrid}>
          {favorites.map((fav) => (
            <div key={fav.id} className={styles.favoriteCard}>
              <img src={fav.image} alt={fav.title} className={styles.favoriteThumbnail} />
              <h3 className={styles.favoriteTitle}>{fav.title}</h3>
              <button onClick={() => removeFromFavorites(fav.id)} className={styles.removeButton}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
