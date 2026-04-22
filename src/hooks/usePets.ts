import { useEffect, useState } from "react";
import type { Pet } from "../types/pets";

interface UsePetResult{
    petsData: Pet[],
    loading: boolean

}

export function usePets(): UsePetResult {
  const [petsData, setPetsData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    // setLoading(true);

    fetch("https://eulerity-hackathon.appspot.com/pets")
      .then((res) => res.json())
      .then((data: Pet[]) => setPetsData(data)).catch((error) => console.error(error.msg) ).finally(()=> setLoading(false));
  },[]);

  return {petsData,loading};
}
