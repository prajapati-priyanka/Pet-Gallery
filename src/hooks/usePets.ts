import { useEffect, useState } from "react";
import type { Pet } from "../types/pets";

interface UsePetResult {
  petsData: Pet[];
  loading: boolean;
  error: string | null,
  isEmpty: boolean,
refetch: () => void;
}

export function usePets(): UsePetResult {
  const [petsData, setPetsData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const [error, setError]     = useState<string | null>(null);
 const [tick, setTick]       = useState(0);

  useEffect(() => {
    async function getPets() {
      setLoading(true);
      setError(null)

      try {
        let pets: Pet[] = [];

        const res = await fetch(
          "https://eulerity-hackathon.appspot.com/pets",
        );
        if (!res.ok) throw new Error("API not available");
        const json = await res.json();
        pets = (Array.isArray(json) ? json : []).map((p: Pet, i: number) => ({
          id: String(i + 1),
          title: p.title,
          description: p.description,
          url: p.url,
          created: p.created,
        }));

        setPetsData(pets);
      } catch (err: any) {
        setError(err.message ?? 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    getPets();
  }, [tick]);

  return { petsData, loading, error,  isEmpty: !loading && !error && petsData.length === 0, refetch: () => setTick(t => t + 1),};
}
