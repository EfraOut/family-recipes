import { useEffect, useMemo, useState } from 'react';
import { listRecipes } from '../api/recipes';
import { getFavorites } from '../store/favorites';
import RecipeCard from '../components/RecipeCard';

export default function Favorites() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let mounted = true;
    listRecipes().then(res => { if (mounted) setRecipes(res.data); });
    return () => { mounted = false; };
  }, []);

  const favSet = new Set(getFavorites());
  const favs = useMemo(() => recipes.filter(r => favSet.has(r._id)), [recipes]);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2>My Favorites</h2>
      {favs.map(r => <RecipeCard key={r._id} recipe={r} />)}
      {!favs.length && <div>No favorites yet.</div>}
    </div>
  );
}
