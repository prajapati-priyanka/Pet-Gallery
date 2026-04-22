import type { Pet } from "../types/pets";

export function filterPets(pets: Pet[], query: string): Pet[] {
  const validSearch = query.toLowerCase().trim();
  if (!validSearch) return pets;
  return pets.filter(
    pet =>
      pet.title.toLowerCase().includes(validSearch) ||
      pet.description.toLowerCase().includes(validSearch)
  );
}