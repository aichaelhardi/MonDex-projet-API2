const BASE_URL = "https://pokeapi.co/api/v2/";
// recupérer la liste des pokémons
export async function getPokemonList(offset) {
  const response = await fetch(`${BASE_URL}pokemon?limit=20&offset=${offset}`)

  if (!response.ok) {
    throw new Error("Erreur leurs de chargement des Pokémon")
  }
  return await response.json()
}


// recupérer et transformer les détails d'un pokémon

export async function PokemonResultat(name) {
  const response = await fetch(`${BASE_URL}pokemon/${name.toLowerCase()}`)

  if (!response.ok) {
    throw new Error("Pokémon introuvable")
  }
  const data = await response.json();
  const creature={
    id : data.id,
    name:data.name,
    type:data.types.map(t=>t.type.name),
    image:data.sprites.other["official-artwork"].front_default,
    stats : data.stats.map(s=>({
      name: s.stat.name,
      value:s.base_stat
    }))
  };
  return creature ;
}
// charger les pokémons avec leurs détails

export async function chargerCreatures(offset) {
  const data =await getPokemonList(offset)

const result= data.results.map(creature=>PokemonResultat(creature.name));
const creature = await Promise.all(result);
return creature;
}


