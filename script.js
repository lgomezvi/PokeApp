// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  console.log("Welcome to Sofia's Web Development Adventure!");
  initializeApp();
});

// =============== INITIALIZATION ===============
function initializeApp() {
  setupEventListeners();
  fetchPokemonData();
}

// =============== EVENT LISTENERS ===============
function setupEventListeners() {
  window.addEventListener("scroll", handleScroll);

  const sofiBtn = document.getElementById("sofiBtn");
  sofiBtn.addEventListener("click", () => changeColor("body"));

  const selectColor = document.getElementById("color");
  selectColor.addEventListener("change", handleColorChange);
}

// =============== COLOR FUNCTIONS ===============
const colorDic = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  purple: "#800080",
  orange: "#FFA500",
  pink: "#FFC0CB",
  black: "#000000",
  white: "#FFFFFF",
};

function changeColor(elementId) {
  console.log("Changing color of element with id: " + elementId);
  const element = document.getElementById(elementId);
  if (element) {
    element.style.backgroundColor = getRandomColor();
  }
}

function handleColorChange() {
  const color = this.value;
  document.body.style.backgroundColor = colorDic[color];
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// =============== POKEMON API FUNCTIONS ===============
function fetchPokemonData() {
  const mainPokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0";

  fetch(mainPokemonAPI)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => { // "results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"}, ...]
      data.results.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((pokemonData) => {
            createPokemonCard(pokemonData);
          });
      });
    })
    .catch((error) => console.error("Error:", error));
}

function createPokemonCard(pokemonData) {
  const { name, id, sprites, types } = pokemonData;
  const mainType = types[0].type.name;
  // "types": [
  //   {
  //     "slot": 1,
  //     "type": { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" }
  //   },
  //   {
  //     "slot": 2,
  //     "type": { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" }
  //   }
  // ],

  const newCard = document.createElement("div");
  newCard.className = `card bg-base-100 shadow-xl m-4 hover:shadow-2xl transition-shadow duration-300
   border-8 border-double border-${getTypeColor(mainType)}`;
  newCard.style.width = "250px";

  newCard.innerHTML = `
    <figure class="px-6 pt-6">
      <img src="${
        sprites.front_default
      }" alt="Pokémon ${name}" class="rounded-xl h-48 w-48 object-contain bg-base-200">
    </figure>
    <div class="card-body">
      <h2 class="card-title text-lg font-bold">#${String(id).padStart(3,"0")} ${name}</h2>
      <div class="flex flex-wrap gap-1 mb-2">
        ${types.map((t) =>`<span class="badge badge-md border-${getTypeColor(t.type.name)} border-2">${t.type.name}</span>`).join("")}
      </div>
      <p class="text-sm">Height: ${pokemonData.height / 10}m, Weight: ${pokemonData.weight / 10}kg</p>
  
      <div class="card-actions justify-end mt-2">
        <button class="btn btn-primary btn-sm">Coming Soon...</button>
      </div>
    </div>
  `;

  const pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.appendChild(newCard);
}

function getTypeColor(type) {
  const typeColors = {
    normal: "gray-400",
    fire: "red-600",
    water: "blue-500",
    electric: "yellow-400",
    grass: "green-500",
    ice: "cyan-300",
    fighting: "red-700",
    poison: "purple-600",
    ground: "yellow-600",
    flying: "sky-400",
    psychic: "pink-600",
    bug: "lime-500",
    rock: "yellow-700",
    ghost: "indigo-600",
    dragon: "indigo-800",
    dark: "gray-800",
    steel: "gray-500",
    fairy: "pink-400",
  };
  return typeColors[type] || "gray-400";
}

// =============== SCROLL HANDLER ===============
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    console.log("LOAD MORE POKEMON");
    // Implement loading more Pokémon here
  }
}
