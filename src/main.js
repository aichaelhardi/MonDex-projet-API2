import { chargerCreatures } from "./services/api.js";
import { afficherCreatures } from "../script.js";
let creaturesList=[];
let offset =0;
async function chargerPokemons() {
    try{
        const creatures =await chargerCreatures(offset);
    creaturesList =[...creaturesList ,...creatures];
    afficherCreatures(creaturesList);
    } catch (error){
        console.log("Erreur :" , error.message)
    }
}
   chargerPokemons();