import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ marginRight: 'auto' }}>Family Recipes</h1>
        <Link to="/">Home</Link>
        <Link to="/recipes/new">New</Link>
        <Link to="/favorites">Favorites</Link>
      </header>
      {children}
    </div>
  );
}
