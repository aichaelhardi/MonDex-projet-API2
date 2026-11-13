import { chargerCreatures, getPokemonList, PokemonResultat } from "./services/api.js";
import { afficherCreatures } from "../script.js";
let creaturesList = [];
let offset = 20;
let limit = 20;
async function chargerPokemons() {
    try {
        const creatures = await chargerCreatures(offset);
        creaturesList = [...creaturesList, ...creatures];
        afficherCreatures(creaturesList);
    } catch (error) {
        console.log("Erreur :", error.message)
    }
}
//charger plus de pokémon

async function chargerPlus() {
    try {
        offset += limit;
        const response = await getPokemonList(offset);
        const details = await Promise.all(response.results.map(pokemon => PokemonResultat(pokemon.name)));
       
        
        creaturesList = [...creaturesList, ...details];
        afficherCreatures(creaturesList);
    } catch (error) {
        console.log("Erreur :", error.message);
    }
}
//button charger plus
const btnChargerPlus = document.getElementById("charger-plus");
if (btnChargerPlus) {
    btnChargerPlus.addEventListener("click",
        chargerPlus);
}
//Premier chargement
chargerPokemons();