import { useEffect, useState } from 'react';
import { getRecipe } from '../api/recipes';
import { useParams, Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../store/favorites';

export default function RecipeDetail() {
  const { id } = useParams();
  const [r, setR] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    getRecipe(id).then(({data}) => setR(data)).catch(() => setErr('Not found'));
  }, [id]);

  if (err) return <div>{err}</div>;
  if (!r) return <div>Loading…</div>;

  const fav = isFavorite(r._id);
  const onFav = () => { toggleFavorite(r._id); window.dispatchEvent(new Event('storage')); };

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <h2>{r.name}</h2>
      <div>Category: {r.category}</div>
      <div>Prep: {r.prepTime} min · Cook: {r.cookTime} min</div>
      <button onClick={onFav}>{fav ? '★ Unfavorite' : '☆ Favorite'}</button>
      <h3>Ingredients</h3>
      <ul>{r.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      <h3>Instructions</h3>
      <p style={{ whiteSpace: 'pre-wrap' }}>{r.instructions}</p>
      <Link to={`/recipes/${r._id}/edit`}>Edit</Link>
    </div>
  );
}
