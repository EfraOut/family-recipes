import { useState } from 'react';
import { createRecipe } from '../api/recipes';
import { useNavigate } from 'react-router-dom';

export default function NewRecipe() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: '', category: '', prepTime: '', cookTime: '', ingredients: '', instructions: ''
  });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        prepTime: Number(form.prepTime),
        cookTime: Number(form.cookTime),
        ingredients: form.ingredients.split('\n').map(s => s.trim()).filter(Boolean),
      };
      const { data } = await createRecipe(payload);
      nav(`/recipes/${data._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create recipe');
    }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
      <input placeholder="Name" value={form.name} onChange={set('name')} required />
      <select value={form.category} onChange={set('category')} required>
        <option value="">Category</option>
        <option>Desayunos</option><option>Platos Fuertes</option><option>Sopas</option><option>Acompañamientos</option><option>Postres</option>
      </select>
      <input type="number" min="0" placeholder="Prep time (min)" value={form.prepTime} onChange={set('prepTime')} required />
      <input type="number" min="0" placeholder="Cook time (min)" value={form.cookTime} onChange={set('cookTime')} required />
      <textarea rows="4" placeholder="Ingredients (one per line)" value={form.ingredients} onChange={set('ingredients')} required />
      <textarea rows="6" placeholder="Instructions" value={form.instructions} onChange={set('instructions')} required />
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      <button type="submit">Create</button>
    </form>
  );
}
