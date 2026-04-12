let allPokemon = []

// List of names (you can expand later)
let pokemonNames = [
    "pikachu","charizard","bulbasaur","squirtle",
    "eevee","snorlax","mew","dragonite",
    "gengar","machamp"
]

// Fetch using {name} API
function getPokemon(){

    let loading = document.getElementById("loading")
    let container = document.getElementById("pokemon")

    loading.innerText = "Loading..."
    container.innerHTML = ""

    let promises = pokemonNames.map(function(name){
        return fetch("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(res => res.json())
    })

    Promise.all(promises)
    .then(function(data){

        loading.innerText = ""
        allPokemon = data

        displayPokemon(allPokemon)
    })
    .catch(function(){
        loading.innerText = "Error loading data"
    })
}


// Display
function displayPokemon(data){

    let container = document.getElementById("pokemon")
    container.innerHTML = ""

    data.forEach(function(pokemon){

        let attack = pokemon.stats[1].base_stat
        let hp = pokemon.stats[0].base_stat

        container.innerHTML +=
        "<div class='card'>" +
        "<h3>" + pokemon.name + "</h3>" +
        "<img src='" + pokemon.sprites.front_default + "'>" +
        "<p>Attack: " + attack + "</p>" +
        "<p>HP: " + hp + "</p>" +
        "</div>"
    })
}


// 🔍 Search (HOF: filter)
document.getElementById("search").addEventListener("input", function(){

    let value = this.value.toLowerCase()

    let filtered = allPokemon.filter(function(pokemon){
        return pokemon.name.includes(value)
    })

    displayPokemon(filtered)
})


// 📊 Sort (HOF: sort)
document.getElementById("sort").addEventListener("change", function(){

    let value = this.value

    let sorted = [...allPokemon]

    if(value === "attack"){
        sorted.sort(function(a,b){
            return b.stats[1].base_stat - a.stats[1].base_stat
        })
    }

    if(value === "hp"){
        sorted.sort(function(a,b){
            return b.stats[0].base_stat - a.stats[0].base_stat
        })
    }

    displayPokemon(sorted)
})

function toggleDarkMode(){
    document.body.classList.toggle("dark")
}