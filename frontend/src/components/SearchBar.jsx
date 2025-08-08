export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Search by name..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ padding: 8, width: '100%', marginBottom: 12 }}
    />
  );
}
