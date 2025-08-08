import { useEffect, useState } from 'react';
import { getRecipe, updateRecipe } from '../api/recipes';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipe() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getRecipe(id).then(({data}) => {
      setForm({
        name: data.name, category: data.category,
        prepTime: String(data.prepTime), cookTime: String(data.cookTime),
        ingredients: data.ingredients.join('\n'),
        instructions: data.instructions
      });
    }).catch(() => setError('Failed to load recipe'));
  }, [id]);

  if (!form) return <div>Loading…</div>;
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await updateRecipe(id, {
        ...form,
        prepTime: Number(form.prepTime),
        cookTime: Number(form.cookTime),
        ingredients: form.ingredients.split('\n').map(s => s.trim()).filter(Boolean),
      });
      nav(`/recipes/${id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update recipe');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
      <input placeholder="Name" value={form.name} onChange={set('name')} required />
      <select value={form.category} onChange={set('category')} required>
        <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Dessert</option><option>Snack</option>
      </select>
      <input type="number" min="0" placeholder="Prep time (min)" value={form.prepTime} onChange={set('prepTime')} required />
      <input type="number" min="0" placeholder="Cook time (min)" value={form.cookTime} onChange={set('cookTime')} required />
      <textarea rows="4" placeholder="Ingredients (one per line)" value={form.ingredients} onChange={set('ingredients')} required />
      <textarea rows="6" placeholder="Instructions" value={form.instructions} onChange={set('instructions')} required />
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <button type="submit">Save</button>
    </form>
  );
}
