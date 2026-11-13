
// =============================================================
// script.js — Mon Dex Pokémon
// =============================================================

// =============================================================
// 1. ELEMENTS HTML
// =============================================================

const grid = document.getElementById("grid");
const teamContainer = document.getElementById("team-container");
const teamCounter = document.getElementById("team-count");

const detail = document.getElementById("detail");
const closeDetail = document.getElementById("closeDetail");

const searchInput = document.getElementById("search");
const filterButtons = document.getElementById("filterButtons");
const favoritesButton = document.getElementById("filter-favorites");
const clearButton = document.getElementById("clear-search");

const form = document.getElementById("creature-form");
const inputs = form
    ? form.querySelectorAll("input, select, textarea")
    : [];

// =============================================================
// 2. DONNEES
// =============================================================

// Liste des Pokémon reçus depuis l'API
export let creaturesList = [];

// Liste des Pokémon dans l'équipe
let teamList = [];

// Filtres
let selectedType = "all";
let searchValue = "";
let favoritesOnly = false;

// Récupérer les favoris depuis LocalStorage
let favorites = [];

try {
    favorites = JSON.parse(
        localStorage.getItem("pokemon-favorites") || "[]"
    );
} catch (error) {
    favorites = [];
}

// =============================================================
// 3. GESTION DES FAVORIS
// =============================================================

function isFavorite(creatureId) {
    return favorites.includes(String(creatureId));
}

function toggleFavorite(creatureId) {
    creatureId = String(creatureId);

    if (isFavorite(creatureId)) {
        favorites = favorites.filter(
            id => id !== creatureId
        );
    } else {
        favorites.push(creatureId);
    }

    localStorage.setItem(
        "pokemon-favorites",
        JSON.stringify(favorites)
    );

    appliquerFiltres();
}

// =============================================================
// 4. AFFICHER LES POKEMON
// =============================================================

export function afficherCreatures(liste) {
    if (!grid) return;

    grid.innerHTML = "";

    liste.forEach(function (creature) {
        const carte = document.createElement("article");

        carte.className =
            "creature-card flex flex-col gap-3 rounded-[40px] bg-white p-4 shadow-md transition-all duration-300";

        carte.dataset.id = creature.id;

        // Vérifier si le Pokémon est dans l'équipe
        const isInTeam = teamList.some(
            c => String(c.id) === String(creature.id)
        );

        // Vérifier si le Pokémon est favori
        const isInFavorite = isFavorite(creature.id);

        if (isInTeam) {
            carte.classList.add("in-team");
        }

        const types = Array.isArray(creature.type)
            ? creature.type
            : [creature.type];

        carte.innerHTML = `
            <img
                src="${creature.image}"
                alt="${creature.name}"
                class="h-40 w-full object-cover rounded-lg"
            >

            <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-muted">
                    ${creature.id}
                </span>

                <span class="px-2 py-1 text-xs font-bold rounded bg-gray-100">
                    ${types.join(" , ")}
                </span>
            </div>

            <h3 class="font-display text-xl font-bold">
                ${creature.name}
            </h3>

            <div class="text-xs text-muted flex gap-2">
                <span>Niveau : ${creature.level ?? "N/A"}</span>
            </div>

            <button
                type="button"
                class="btn-equipe w-full py-2.5 rounded-xl border-2 border-gray-800 font-bold
                ${isInTeam ? "bg-blue-600 text-white" : "text-gray-800"}"
            >
                ${isInTeam ? "Retirer de l'équipe" : "Ajouter à l'équipe"}
            </button>

            <button
                type="button"
                class="btn-favori w-full py-2.5 rounded-xl border-2 border-pink-500 font-bold
                ${isInFavorite ? "bg-pink-500 text-white" : "text-pink-600"}"
            >
                ${isInFavorite ? "❤️ Retirer des favoris" : "🤍 Ajouter aux favoris"}
            </button>
        `;

        carte.addEventListener("click", function (event) {
            if (event.target.closest("button")) return;

            showDetail(creature);
        });

        grid.appendChild(carte);
    });
}

// =============================================================
// 5. RECEVOIR LES DONNEES DEPUIS MAIN.JS
// =============================================================

export function mettreAjourListe(liste) {
    creaturesList = liste;
    appliquerFiltres();
}

// =============================================================
// 6. FILTRAGE ET RECHERCHE
// =============================================================

function appliquerFiltres() {
    let resultat = [...creaturesList];

    // Filtrage par type
    if (selectedType !== "all") {
        resultat = resultat.filter(creature => {
            const types = Array.isArray(creature.type)
                ? creature.type
                : [creature.type];

            return types.some(
                type => String(type).toLowerCase() === selectedType
            );
        });
    }

    // Recherche par nom
    if (searchValue !== "") {
        resultat = resultat.filter(creature =>
            String(creature.name)
                .toLowerCase()
                .includes(searchValue)
        );
    }

    // Afficher uniquement les favoris
    if (favoritesOnly) {
        resultat = resultat.filter(creature =>
            isFavorite(creature.id)
        );
    }

    afficherCreatures(resultat);
}

// =============================================================
// 7. RECHERCHE PAR NOM
// =============================================================

if (searchInput) {
    searchInput.addEventListener("input", function () {
        searchValue = searchInput.value.toLowerCase().trim();
        appliquerFiltres();
    });
}

// =============================================================
// 8. FILTRAGE PAR TYPE
// =============================================================

if (filterButtons) {
    filterButtons.addEventListener("click", function (event) {
        const button = event.target.closest(".chip");

        if (!button) return;

        selectedType = (
            button.dataset.type || "all"
        ).toLowerCase();

        filterButtons.querySelectorAll(".chip").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        appliquerFiltres();
    });
}

// =============================================================
// 9. FILTRE DES FAVORIS
// =============================================================

if (favoritesButton) {
    favoritesButton.addEventListener("click", function () {
        favoritesOnly = !favoritesOnly;

        favoritesButton.classList.toggle("active");

        appliquerFiltres();
    });
}

// =============================================================
// 10. EFFACER LES FILTRES
// =============================================================

if (clearButton) {
    clearButton.addEventListener("click", function () {
        searchValue = "";
        selectedType = "all";
        favoritesOnly = false;

        if (searchInput) {
            searchInput.value = "";
        }

        if (favoritesButton) {
            favoritesButton.classList.remove("active");
        }

        if (filterButtons) {
            filterButtons.querySelectorAll(".chip").forEach(btn => {
                btn.classList.remove("active");
            });
        }

        appliquerFiltres();
    });
}

// =============================================================
// 11. GESTION DES CLICS SUR LES CARTES
// =============================================================

if (grid) {
    grid.addEventListener("click", function (event) {

        // Bouton Favoris
        const favoriteButton = event.target.closest(".btn-favori");

        if (favoriteButton) {
            const carte = favoriteButton.closest(".creature-card");

            if (!carte) return;

            toggleFavorite(carte.dataset.id);
            return;
        }

        // Bouton Equipe
        const teamButton = event.target.closest(".btn-equipe");

        if (teamButton) {
            const carte = teamButton.closest(".creature-card");

            if (!carte) return;

            const creatureId = carte.dataset.id;

            const creature = creaturesList.find(
                c => String(c.id) === String(creatureId)
            );

            if (!creature) return;

            const index = teamList.findIndex(
                c => String(c.id) === String(creatureId)
            );

            // Retirer de l'équipe
            if (index !== -1) {
                teamList.splice(index, 1);
            } else {
                // Vérifier la limite de 6 Pokémon
                if (teamList.length >= 6) {
                    alert("Votre équipe est complète (6/6 maximum) !");
                    return;
                }

                teamList.push(creature);
            }

            appliquerFiltres();
            renderTeam();
        }
    });
}

// =============================================================
// 12. DETAILS DU POKEMON
// =============================================================

function showDetail(creature) {
    if (!detail || !creature) return;

    const setText = (id, value) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value ?? "N/A";
        }
    };

    setText("detail-name", creature.name);
    setText("detail-id", creature.id);

    const types = Array.isArray(creature.type)
        ? creature.type.join(", ")
        : creature.type;

    setText("detail-type", "Type : " + types);
    setText("detail-level", "Niveau : " + (creature.level ?? "N/A"));

    const image = document.getElementById("detail-image");

    if (image) {
        image.src = creature.image || "";
        image.alt = creature.name;
    }

    setText("detail-description", creature.description);

    if (creature.stats) {
        setText("detail-hp", creature.stats.hp);
        setText("detail-attack", creature.stats.attack);
        setText("detail-defence", creature.stats.defence);
    }

    detail.classList.remove("hidden");
}

if (closeDetail && detail) {
    closeDetail.addEventListener("click", function () {
        detail.classList.add("hidden");
    });
}

// =============================================================
// 13. VALIDATION DU FORMULAIRE
// =============================================================

const rules = {
    id: {
        regex: /^#\d{3}$/,
        message: "Le numéro doit être au format #010."
    },

    name: {
        regex: /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,
        message: "Le nom doit contenir entre 2 et 30 caractères."
    },

    type: {
        isValid: value => value !== "",
        message: "Veuillez choisir un type."
    },

    level: {
        regex: /^.+$/,
        message: "Le niveau ne peut pas être vide."
    },

    stat1: {
        regex: /^\d{1,3}$/,
        message: "Entrez un nombre entre 0 et 999."
    },

    stat2: {
        regex: /^\d{1,3}$/,
        message: "Entrez un nombre entre 0 et 999."
    },

    stat3: {
        regex: /^\d{1,3}$/,
        message: "Entrez un nombre entre 0 et 999."
    },

    image: {
        isValid: value => {
            try {
                const url = new URL(value);
                return url.protocol === "https:";
            } catch {
                return false;
            }
        },
        message: "Veuillez saisir une URL d'image HTTPS valide."
    },

    description: {
        regex: /^[\s\S]{10,200}$/,
        message: "La description doit contenir entre 10 et 200 caractères."
    }
};

function displayError(inputElement, message) {
    const parent = inputElement.parentElement;

    if (!parent) return;

    const errorSpan = parent.querySelector(".error-message");

    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function validateField(inputElement) {
    const fieldName = inputElement.name;
    const fieldValue = inputElement.value.trim();
    const rule = rules[fieldName];

    if (!rule) return true;

    let isValid = true;

    if (fieldName === "id") {
        const formatValid = rule.regex.test(fieldValue);

        const alreadyUsed = creaturesList.some(
            creature => String(creature.id) === fieldValue
        );

        isValid = formatValid && !alreadyUsed;
    } else if (rule.isValid) {
        isValid = rule.isValid(fieldValue);
    } else if (rule.regex) {
        isValid = rule.regex.test(fieldValue);
    }

    if (!isValid) {
        let message = rule.message;

        if (
            fieldName === "id" &&
            rule.regex.test(fieldValue)
        ) {
            message = "Ce numéro est déjà utilisé.";
        }

        displayError(inputElement, message);
        return false;
    }

    displayError(inputElement, "");
    return true;
}

// Vérification des champs
inputs.forEach(input => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("change", () => validateField(input));
});

// Envoi du formulaire
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isFormValid = true;
        const newCreatureData = {};

        inputs.forEach(input => {
            const valid = validateField(input);

            if (!valid) {
                isFormValid = false;
            } else {
                newCreatureData[input.name] = input.value.trim();
            }
        });

        if (!isFormValid) {
            alert("Veuillez corriger les champs invalides.");
            return;
        }

        const newCreature = {
            id: newCreatureData.id,
            name: newCreatureData.name,
            type: [newCreatureData.type],
            level: newCreatureData.level,
            image: newCreatureData.image,
            description: newCreatureData.description,
            stats: {
                hp: newCreatureData.stat1 || "0",
                attack: newCreatureData.stat2 || "0",
                defence: newCreatureData.stat3 || "0"
            }
        };

        creaturesList.push(newCreature);

        appliquerFiltres();

        alert("Créature ajoutée avec succès !");

        form.reset();

        inputs.forEach(input => {
            displayError(input, "");
        });
    });
}

// =============================================================
// 14. AFFICHER ET GERER MON EQUIPE
// =============================================================

function renderTeam() {

    // Actualiser le compteur
    if (teamCounter) {
        teamCounter.textContent = teamList.length;
    }

    if (!teamContainer) return;

    teamContainer.innerHTML = "";

    // Créer 6 emplacements
    for (let i = 0; i < 6; i++) {

        const creature = teamList[i];

        if (creature) {
            const filledSlot = document.createElement("div");

            filledSlot.className =
                "team-filled-slot relative flex flex-col items-center justify-between p-3 h-36 bg-white border-2 border-blue-500 rounded-xl shadow-md cursor-pointer group transition hover:border-red-500";

            filledSlot.dataset.id = creature.id;

            filledSlot.innerHTML = `
                <span class="absolute top-1 left-2 text-[10px] font-bold text-gray-400">
                    #0${i + 1}
                </span>

                <img
                    src="${creature.image}"
                    alt="${creature.name}"
                    class="w-12 h-12 object-cover rounded-lg mt-2"
                >

                <span class="text-xs font-bold text-gray-800 truncate w-full text-center">
                    ${creature.name}
                </span>

                <span class="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded">
                    Retirer
                </span>
            `;

            teamContainer.appendChild(filledSlot);

        } else {
            const emptySlot = document.createElement("div");

            emptySlot.className =
                "team-slot flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-xs font-semibold bg-gray-50/50";

            emptySlot.innerHTML = `
                <span class="text-gray-300 font-bold mb-1">
                    0${i + 1}
                </span>
                Emplacement
            `;

            teamContainer.appendChild(emptySlot);
        }
    }
}

// Retirer un Pokémon en cliquant sur son emplacement
if (teamContainer) {
    teamContainer.addEventListener("click", function (event) {

        const slot = event.target.closest(".team-filled-slot");

        if (!slot) return;

        const creatureId = slot.dataset.id;

        teamList = teamList.filter(
            creature => String(creature.id) !== String(creatureId)
        );

        appliquerFiltres();
        renderTeam();
    });
}

// Initialiser les 6 emplacements
renderTeam();
