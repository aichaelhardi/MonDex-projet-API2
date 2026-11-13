
import { chargerCreatures } from "./services/api.js";
import { mettreAjourListe } from "../script.js";

let offset = 20;
let limit = 20;
let creaturesList = [];

// Premier chargement
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

// Charger plus de Pokémon
async function chargerPlus() {
    try {
        const creatures = await chargerCreatures(offset);

        creaturesList = [...creaturesList, ...creatures];

        mettreAjourListe(creaturesList);

        offset += limit;

    } catch (error) {
        console.log("Erreur :", error.message);
    }
}

// Bouton Charger plus
const btnChargerPlus = document.getElementById("charger-plus");

if (btnChargerPlus) {
    btnChargerPlus.addEventListener("click", chargerPlus);
}

// Lancement
chargerPokemons();
