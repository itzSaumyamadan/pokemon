function getPokemon(){

    let loading = document.getElementById("loading")
    let container = document.getElementById("pokemon")

    loading.innerText = "Loading..."

    fetch("https://pokeapi.co/api/v2/pokemon/{name}")

    .then(function(response){
        return response.json()
    })

    .then(function(data){

        loading.innerText = ""

        container.innerHTML =
        "<h2>" + data.name + "</h2>" +
        "<img src='" + data.sprites.front_default + "'>" +
        "<p>Height: " + data.height + "</p>" +
        "<p>Weight: " + data.weight + "</p>"

    })

    .catch(function(){
        loading.innerText = "Error loading data"
    })

}