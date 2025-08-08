const KEY = 'favorites';

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id) {
  const current = new Set(getFavorites());
  if (current.has(id)) current.delete(id);
  else current.add(id);
  const arr = [...current];
  localStorage.setItem(KEY, JSON.stringify(arr));
  return arr;
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}
