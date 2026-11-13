import { chargerCreatures } from "./services/api.js";
import { mettreAjourListe } from "../script.js";


let offset = 0;
let limit = 20;
let creaturesList=[];

async function chargerPokemons() {

    try {

        const creatures = await chargerCreatures(offset);

        creaturesList = [...creaturesList, ...creatures];

        mettreAjourListe(creaturesList);

        offset += limit;

    } catch (error) {

        console.log("Erreur :", error.message);
    }
}

//charger plus de pokémon

async function chargerPlus() {
    try {
        offset += limit;
        const creatures = await chargerCreatures(offset);
        creaturesList =[...creaturesList,...creatures];
        mettreAjourListe(creaturesList);
      
    } catch (error) {
        offset -= limit;
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