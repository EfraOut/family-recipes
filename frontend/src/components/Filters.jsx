export default function Filters({ category, setCategory, prepMax, setPrepMax, cookMax, setCookMax }) {
  return (
    <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr 1fr', marginBottom: 12 }}>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All categories</option>
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Dessert</option>
        <option>Snack</option>
      </select>
      <input type="number" min="0" placeholder="Max prep (min)" value={prepMax} onChange={e => setPrepMax(e.target.value)} />
      <input type="number" min="0" placeholder="Max cook (min)" value={cookMax} onChange={e => setCookMax(e.target.value)} />
      <button onClick={() => { setCategory(''); setPrepMax(''); setCookMax(''); }}>
        Clear
      </button>
    </div>
  );
}
