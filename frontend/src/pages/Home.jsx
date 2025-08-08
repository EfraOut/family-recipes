import { useEffect, useMemo, useState } from 'react';
import { listRecipes } from '../api/recipes';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [prepMax, setPrepMax] = useState('');
  const [cookMax, setCookMax] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    listRecipes()
      .then(res => { if (mounted) setRecipes(res.data); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchName = r.name.toLowerCase().includes(q.toLowerCase());
      const matchCat = !category || r.category === category;
      const matchPrep = !prepMax || r.prepTime <= Number(prepMax);
      const matchCook = !cookMax || r.cookTime <= Number(cookMax);
      return matchName && matchCat && matchPrep && matchCook;
    });
  }, [recipes, q, category, prepMax, cookMax]);

  return (
    <div>
      <SearchBar value={q} onChange={setQ} />
      <Filters
        category={category} setCategory={setCategory}
        prepMax={prepMax} setPrepMax={setPrepMax}
        cookMax={cookMax} setCookMax={setCookMax}
      />
      {loading ? <div>Loading…</div> : (
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(r => <RecipeCard key={r._id} recipe={r} />)}
          {!filtered.length && <div>No recipes match your filters.</div>}
        </div>
      )}
    </div>
  );
}
