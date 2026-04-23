import type { Pet, SortOption } from "../types/pets";

export function filterPets(pets: Pet[], query: string): Pet[] {
  const validSearch = query.toLowerCase().trim();
  if (!validSearch) return pets;
  return pets.filter(
    pet =>
      pet.title.toLowerCase().includes(validSearch) ||
      pet.description.toLowerCase().includes(validSearch)
  );
}

export function sortPets(pets: Pet[], option: SortOption): Pet[] {
  return [...pets].sort((a, b) => {
    switch (option) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'date-newest':
        return new Date(b.created).getTime() - new Date(a.created).getTime()
          || Number(b.id) - Number(a.id);
      case 'date-oldest':
        return new Date(a.created).getTime() - new Date(b.created).getTime()
          || Number(a.id) - Number(b.id);
      default:
        return 0;
    }
  });
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}