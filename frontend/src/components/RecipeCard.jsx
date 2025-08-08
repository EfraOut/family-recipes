import { Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../store/favorites';
import { useSyncExternalStore } from 'react';

// tiny store subscription trick so the heart updates
function useFav(id) {
  const subscribe = (cb) => {
    window.addEventListener('storage', cb);
    return () => window.removeEventListener('storage', cb);
  };
  const getSnapshot = () => isFavorite(id);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export default function RecipeCard({ recipe }) {
  const fav = useFav(recipe._id);

  const onFav = () => {
    toggleFavorite(recipe._id);
    // trigger storage event for same-tab listeners
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, display: 'grid', gap: 8 }}>
      <Link to={`/recipes/${recipe._id}`}><h3>{recipe.name}</h3></Link>
      <div>Category: {recipe.category}</div>
      <div>Prep: {recipe.prepTime} min · Cook: {recipe.cookTime} min</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link>
        <button onClick={onFav} aria-label="toggle favorite">
          {fav ? '★ Unfavorite' : '☆ Favorite'}
        </button>
      </div>
    </div>
  );
}
