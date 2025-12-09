// services/riotApi.ts
export type RawChampion = {
  id: string;
  key: string;
  name: string;
  title: string;
  tags: string[];
};

const API_URL =
  "https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json";

export async function getChampions(): Promise<RawChampion[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  // Object.values garante retornar array do map data
  return Object.values(json.data) as RawChampion[];
}
