// =============================================================
// script.js — Mon Dex
// =============================================================
const grid = document.getElementById("grid");
const creaturesContainer = document.getElementById("grid");
const teamContainer = document.getElementById('team-container');
const teamCounter = document.getElementById('team-count');

// Tableaux de données
let creaturesList = [];
let teamList = [];


// -------------------------------------------------------------
//  AFFICHAGE DES CRÉATURES
// -------------------------------------------------------------

 export function afficherCreatures(liste) {

    if (!grid) return;
    grid.innerHTML = ""

    liste.forEach(function (creature) {
        const carte = document.createElement("article");
        carte.className = "creature-card flex flex-col gap-3 rounded-[40px] bg-white p-4 shadow-md transition-all duration-300";
        carte.dataset.id = creature.id;

        const isInTeam = teamList.some(c => c.id === creature.id);
        if (isInTeam) {
            carte.classList.add('in-team');
        }


        carte.innerHTML = `
            <img src="${creature.image}" alt="${creature.name}" class="h-40 w-full object-cover rounded-lg">
            <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-muted">${creature.id}</span>
                <span class="px-2 py-1 text-xs font-bold rounded bg-gray-100">${creature.type.join(" , ")}</span>
            </div>
            <h3 class="font-display text-xl font-bold">${creature.name}</h3>
            
            <div class="text-xs text-muted flex gap-2">
                <span>Niveau : ${creature.level}</span>
            </div>

            <!-- LE BOUTON AJOUTER À L'ÉQUIPE -->
            <button type="button" class="btn-equipe w-full py-2.5 rounded-xl border-2 border-gray-800 font-bold text-gray-800 transition hover:bg-gray-900 hover:text-white ${isInTeam ? 'active bg-blue-600 text-white' : ''}">
                ${isInTeam ? "Retirer de l'équipe" : "ajouter à l'équipe"}
            </button>
        `;

        carte.addEventListener("click", function (e) {
            if (e.target.closest('.btn-equipe')) return;
            showDetail(creature);
        });

        grid.appendChild(carte);
    });
}




// -------------------------------------------------------------
// DÉTAIL
// -------------------------------------------------------------
const detail = document.getElementById("detail");
const closeDetail = document.getElementById("closeDetail");

function showDetail(creature) {
    if (!detail || !creature) return;

    document.getElementById("detail-name").textContent = creature.name;
    document.getElementById("detail-id").textContent = creature.id;
    document.getElementById("detail-type").textContent = "Type: " + creature.type;
    document.getElementById("detail-level").textContent = "Niveau: " + creature.level;
    document.getElementById("detail-image").src = creature.image;
    document.getElementById("detail-description").textContent = creature.description;

    if (creature.stats) {
        document.getElementById("detail-hp").textContent = creature.stats.hp;
        document.getElementById("detail-attack").textContent = creature.stats.attack;
        document.getElementById("detail-defence").textContent = creature.stats.defence;
    }

    detail.classList.remove("hidden");
}

if (closeDetail && detail) {
    closeDetail.addEventListener("click", function () {
        detail.classList.add("hidden");
    });
}


// -------------------------------------------------------------
//  RECHERCHE ET FILTRES
// -------------------------------------------------------------

function filtrerCreatures() {
    afficherCreatures(creaturesList);
    const filterdiv = document.querySelector("#filterButtons")
    if (!filterdiv) return;

    filterdiv.addEventListener('click', (event) => {
        const btn = event.target.closest(".chip")
        if (!btn) return;
        const nametype = btn.textContent.toLowerCase().trim()
        if (nametype === 'all') {
            afficherCreatures(creaturesList);
            return
        }
        else {
            const resultats = creaturesList.filter((c) => c.type.toLowerCase().trim() === nametype)
            afficherCreatures(resultats);
        }
    });
}
filtrerCreatures();

function searchCreatures() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.toLowerCase().trim();
        let filteredCreatures = [];

        if (searchValue !== "") {
            creaturesList.forEach((c) => {
                if (c.name.toLowerCase().trim().includes(searchValue))
                    filteredCreatures.push(c)
            })
            afficherCreatures(filteredCreatures)
        } else {
            afficherCreatures(creaturesList);
        }

        const filterButtons = document.querySelectorAll('#filterButtons button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    });
};
searchCreatures();


// -------------------------------------------------------------
// CRÉER UNE CRÉATURE
// -------------------------------------------------------------
const form = document.getElementById('creature-form');
const inputs = form ? form.querySelectorAll('input, select, textarea') : [];



const rules = {
    id: {
        regex: /^#\d{3}$/,
        message: "Le numéro doit être au format # suivi de 3 chiffres (ex: #010)."
    },
    name: {
        regex: /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/,
        message: "Le nom doit contenir de 2 à 30 caractères, commencer par une lettre ou un chiffre."
    },
    type: {
        isValid: (value) => value !== "",
        message: "Veuillez choisir un type valide dans la liste."
    },
    level: {
        regex: /.+/,
        message: "Le niveau ne peut pas être vide."
    },
    stat1: {
        regex: /^\d{1,3}$/,
        message: "Doit être un nombre entier de 0 à 999."
    },
    stat2: {
        regex: /^\d{1,3}$/,
        message: "Doit être un nombre entier de 0 à 999."
    },
    stat3: {
        regex: /^\d{1,3}$/,
        message: "Doit être un nombre entier de 0 à 999."
    },
    image: {
        regex: /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i,
        message: "Lien invalide (doit commencer par https:// et finir par .png, .jpg, .jpeg, .webp ou .gif)."
    },
    description: {
        regex: /^[\s\S]{10,200}$/,
        message: "La description doit contenir entre 10 et 200 caractères."
    }
};

function displayError(inputElement, message) {
    const errorSpan = inputElement.parentElement.querySelector('.error-message');
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

    if (fieldName === 'id') {
        const isFormatValid = rule.regex.test(fieldValue);


        const isAlreadyUsed = creaturesList.some(creature => creature.id === fieldValue);
        if (!isFormatValid || isAlreadyUsed) isValid = false;
    }
    else if (fieldName === 'type') {
        isValid = rule.isValid(fieldValue);
    }
    else if (rule.regex) {
        isValid = rule.regex.test(fieldValue);
    }

    if (!isValid) {
        if (fieldName === 'id' && rule.regex.test(fieldValue)) {
            displayError(inputElement, "Ce numéro est déjà utilisé par une autre créature.");
        } else {
            displayError(inputElement, rule.message);
        }
        return false;
    } else {
        displayError(inputElement, '');
        return true;
    }
}

inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('change', () => validateField(input));
});

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isFormValid = true;
        const newCreatureData = {};

        inputs.forEach(input => {
            const isValid = validateField(input);
            if (!isValid) {
                isFormValid = false;
            } else {
                newCreatureData[input.name] = input.value.trim();
            }
        });

        if (isFormValid) {
            const formattedCreature = {
                id: newCreatureData.id,
                name: newCreatureData.name,
                type: newCreatureData.type,
                level: newCreatureData.level,
                image: newCreatureData.image,
                description: newCreatureData.description,
                stats: {
                    hp: newCreatureData.stat1 || "0",
                    attack: newCreatureData.stat2 || "0",
                    defence: newCreatureData.stat3 || "0"
                }
            };

            creaturesList.push(formattedCreature);
            afficherCreatures(creaturesList);

            alert("Créature ajoutée avec succès !");

            form.reset();
            inputs.forEach(input => displayError(input, ''));
        } else {
            alert("Le formulaire ne peut pas être envoyé tant qu'un champ est invalide.");
        }
    });
}


// -------------------------------------------------------------
//  MON ÉQUIPE & RÈGLES 
// -------------------------------------------------------------

// 1. Écouteur unique sur la grille principale
if (creaturesContainer) {
    creaturesContainer.addEventListener('click', (event) => {
        const btnEquipe = event.target.closest('.btn-equipe');
        if (!btnEquipe) return;

        const card = btnEquipe.closest('.creature-card');
        if (!card) return;

        const creatureId = card.dataset.id;
        const creature = creaturesList.find(c => c.id === creatureId);
        if (!creature) return;

        const isInTeam = teamList.some(c => c.id === creatureId);

        if (!isInTeam) {
            // Règle : Maximum 6 créatures
            if (teamList.length >= 6) {
                alert("Votre équipe est complète (6/6 maximum) !");
                return;
            }
            // Règle : Pas de doublon 
            if (teamList.some(c => c.id === creature.id)) {
                alert("Cette créature est déjà dans votre équipe !");
                return;
            }

            teamList.push(creature);
            card.classList.add('in-team');
            btnEquipe.textContent = "Retirer de l'équipe";
            btnEquipe.classList.add('active', 'bg-blue-600', 'text-white');
        } else {
            teamList = teamList.filter(c => c.id !== creatureId);
            card.classList.remove('in-team');
            btnEquipe.textContent = "ajouter à l'équipe";
            btnEquipe.classList.remove('active', 'bg-blue-600', 'text-white');
        }

        renderTeam();
    });
}

// 2. Écouteur unique sur la section équipe
if (teamContainer) {
    teamContainer.addEventListener('click', (event) => {
        const slot = event.target.closest('.team-filled-slot');
        if (!slot) return;

        const creatureId = slot.dataset.id;

        teamList = teamList.filter(c => c.id !== creatureId);

        const cardInGrid = creaturesContainer.querySelector(`[data-id="${creatureId}"]`);
        if (cardInGrid) {
            cardInGrid.classList.remove('in-team');
            const btn = cardInGrid.querySelector('.btn-equipe');
            if (btn) {
                btn.textContent = "ajouter à l'équipe";
                btn.classList.remove('active', 'bg-blue-600', 'text-white');
            }
        }

        renderTeam();
    });
}

// 3. Fonction de mise à jour des emplacements de l'équipe et du compteur
function renderTeam() {
    if (teamCounter) {
        teamCounter.textContent = teamList.length;
    }


    if (!teamContainer) return;
    teamContainer.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const creature = teamList[i];

        if (creature) {
            const filledSlot = document.createElement('div');
            filledSlot.className = "team-filled-slot relative flex flex-col items-center justify-between p-3 h-36 bg-white border-2 border-blue-500 rounded-xl shadow-md cursor-pointer group transition hover:border-red-500";
            filledSlot.dataset.id = creature.id;

            filledSlot.innerHTML = `
                <span class="absolute top-1 left-2 text-[10px] font-bold text-gray-400">#0${i + 1}</span>
                <img src="${creature.image}" alt="${creature.name}" class="w-12 h-12 object-cover rounded-lg mt-2">
                <span class="text-xs font-bold text-gray-800 truncate w-full text-center">${creature.name}</span>
                <span class="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">Retirer</span>
            `;
            teamContainer.appendChild(filledSlot);
        } else {
            const emptySlot = document.createElement('div');
            emptySlot.className = "team-slot flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-xs font-semibold bg-gray-50/50";
            emptySlot.innerHTML = `<span class="text-gray-300 font-bold mb-1">0${i + 1}</span> Emplacement`;
            teamContainer.appendChild(emptySlot);
        }
    }
}

renderTeam();