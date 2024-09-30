// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", function () {
  console.log("Welcome to Sofia's Web Development Adventure!");

  // You can add more JavaScript code here as you progress through the project
});

window.addEventListener("scroll",handleScroll);

// Example function to change text color (you can expand on this later)
function changeColor(elementId) {
  console.log("Changing color of element with id: " + elementId);
  const element = document.getElementById(elementId);
  if (element) {
    element.style.backgroundColor = getRandomColor();
  }
}

const sofiBtn = document.getElementById("sofiBtn");
sofiBtn.addEventListener("click", function () {
  changeColor("body");
});

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

const selectColor = document.getElementById("color");
selectColor.addEventListener("change", function () {
  const color = selectColor.value;
  document.body.style.backgroundColor = colorDic[color];
});

// Helper function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const nasaPic = document.getElementById("nasaPic");

// // Define the API URL
// const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

// // Make a GET request
// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data.url);
//     nasaPic.src = data.url;
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// FETCH MAIN POKEMON API
const mainPokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0";

fetch(mainPokemonAPI)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  // here we have access to the data
  .then((data) => {
    //console.log(data.results.length);
    for (let i = 0; i < data.results.length; i++) {
      // fetch the pokemon details using the url
      fetch(data.results[i].url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((pokemonData) => {
          createPokemonCard(
            pokemonData.name,
            pokemonData.sprites.front_default,
            pokemonData.id
          );
        });
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    console.log("LOAD MORE POKEMON");
  }
}

/* APIs to use:
https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
https://pokeapi.co/
https://jsonplaceholder.typicode.com/
*/

function createPokemonCard(name, imgSrc, id) {
  const newCard = document.createElement("div");
  newCard.className = "card card-compact bg-base-100 w-96 shadow-xl m-4";

  newCard.innerHTML = `
      <figure>
        <img src="${imgSrc}" alt="Pokemon ${name}">
      </figure>
      <div class="card-body">
        <h2 class="card-title">Pokémon ${name} #${id}</h2>
        <p>This is a description for Pokémon #${id}.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">View Details</button>
        </div>
      </div>
    `;

  const pokemonContainer = document.getElementById("pokemon-container");
  pokemonContainer.appendChild(newCard);
}
