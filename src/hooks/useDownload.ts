import type { Pet } from "../types/pets";


export function useDownload() {
  const downloadSingle = async (pet: Pet) => {
    try {
      const res  = await fetch(pet.url);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `${pet.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      console.warn(`Could not download image for ${pet.title}`);
    }
  };

  const downloadAll = async (pets: Pet[]) => {
    for (const pet of pets) {
      await downloadSingle(pet);
      await new Promise(r => setTimeout(r, 400));
    }
  };

  const estimateSize = (count: number): string => {
    const kb = count * 512;
    return kb >= 1024
      ? `~${(kb / 1024).toFixed(1)} MB`
      : `~${kb} KB`;
  };

  return { downloadSingle, downloadAll, estimateSize };
}
