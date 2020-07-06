window.onload = function () {
    //API llama para cargar BreedNames en el menú desplegable
    fetch("https://api.thecatapi.com/v1/breeds",{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f221c99b-304d-4404-b111-cbd3ddccf31a"
        }
    })

    .then(function (response){
        return response.json();
    })

    .then(function (json){
        loadDropDown(json);
    });

    // Botón que llama a la función para mostrar información de raza
    let button = document.querySelector("button");

    button.onclick = loadInfo;
}

// función para cargar nombres de raza en el menú desplegable
function loadDropDown(objects)
{
    let list = document.getElementById("breeds");

    for(let i=0; i<objects.length; i++)
    {
        let option = document.createElement("option");

        option.textContent = objects[i].name;

        list.appendChild(option);
    }
}

// función para mostrar información de raza en el lado derecho de la página
function loadInfo()
{
    let dropDownValue = document.getElementById("breeds");
    fetch("https://api.thecatapi.com/v1/breeds/search?q=" + dropDownValue.value, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f221c99b-304d-4404-b111-cbd3ddccf31a"
        }
    })

    .then(function(response){
        return response.json();
    })

    .then(function(json){
       let data = json[0];

       let name = document.getElementById("name");
       name.innerText = data.name;

       let description = document.getElementById("description");
       description.innerText = data.description;

        let origin = document.getElementById("origin");
        origin.innerText = data.origin;

        let lifeSpan = document.getElementById("life-span");
        lifeSpan.innerText = data["life_span"];

        //child friendly
        let childFriendlyValue = data["child_friendly"];
        childFriendly(childFriendlyValue);

        //dog friendly
        let dogFriendlyValue = data["dog_friendly"];
        dogFriendly(dogFriendlyValue);

        //energy level
        let energyLevelValue = data["energy_level"];
        energyLevel(energyLevelValue);

        // Social Needs
        let socialNeedsValue = data["social_needs"];
        socialNeeds(socialNeedsValue);

        let learnMore = document.getElementById("wiki");
        learnMore.innerText = "wikipedia";
        learnMore.setAttribute("href", data["wikipedia_url"]);

        let breedId = data["id"];
        showImages(breedId);
    });
}

// Función API Call para mostrar imágenes que se seleccionaron en el menú desplegable
function showImages(tempId)
{
    fetch("https://api.thecatapi.com/v1/images/search?breed_id="+tempId+"&limit=10",{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "f221c99b-304d-4404-b111-cbd3ddccf31a"
        }
    })

    .then(function (response) {
        return response.json();
    })

    .then((json) => {
        loadCats(json);
    });
}

// función para agregar imágenes en las etiquetas <img> en flexbox
function loadCats(objects)
{
    let square = document.getElementById("bottom");

    square.innerHTML = "";

    for(let i=0; i<objects.length; i++)
    {
        let item = document.createElement("img");
        item.setAttribute("src", objects[i].url);
        square.appendChild(item);
    }
}

function childFriendly(childFriendlyValue)
{
    let childFriendly = document.getElementById("child-friendly");

    switch (childFriendlyValue)
    {
        case 1:
            childFriendly.innerText = "very unfriendly " + "(" + childFriendlyValue + ")";
            break;

        case 2:
            childFriendly.innerText = "unfriendly " + "(" + childFriendlyValue + ")";
            break;

        case 3:
            childFriendly.innerText = "indifferent " + "(" + childFriendlyValue + ")";
            break;

        case 4:
            childFriendly.innerText = "friendly " + "(" + childFriendlyValue + ")";
            break;

        case 5:
            childFriendly.innerText = "very friendly " + "(" + childFriendlyValue + ")";
            break;
    }
}

// función para declaraciones de cambio, amigable para perros
function dogFriendly(dogFriendlyValue)
{
    let dogFriendly = document.getElementById("dog-friendly");

    switch (dogFriendlyValue)
    {
        case 1:
            dogFriendly.innerText = "very unfriendly " + "(" + dogFriendlyValue + ")";
            break;

        case 2:
            dogFriendly.innerText = "unfriendly " + "(" + dogFriendlyValue + ")";
            break;

        case 3:
            dogFriendly.innerText = "indifferent " + "(" + dogFriendlyValue + ")";
            break;

        case 4:
            dogFriendly.innerText = "friendly " + "(" + dogFriendlyValue + ")";
            break;

        case 5:
            dogFriendly.innerText = "very friendly " + "(" + dogFriendlyValue + ")";
            break;
    }
}

// función para declaraciones de cambio, nivel de energía
function energyLevel(energyLevelValue)
{
    let energyLevel = document.getElementById("energy-level");

    switch (energyLevelValue)
    {
        case 1:
            energyLevel.innerText = "like a sloth " + "(" + energyLevelValue + ")";
            break;

        case 2:
            energyLevel.innerText = "slow moving " + "(" + energyLevelValue + ")";
            break;

        case 3:
            energyLevel.innerText = "energetic " + "(" + energyLevelValue + ")";
            break;

        case 4:
            energyLevel.innerText = "a ball of energy " + "(" + energyLevelValue + ")";
            break;

        case 5:
            energyLevel.innerText = "bouncing off the walls " + "(" + energyLevelValue + ")";
            break;
    }
}

// función para cambiar declaraciones, necesidades sociales
function socialNeeds(socialNeedsValue)
{
    let socialNeeds = document.getElementById("social-needs");

    switch (socialNeedsValue)
    {
        case 1:
            socialNeeds.innerText = "antisocial " + "(" + socialNeedsValue + ")";
            break;

        case 2:
            socialNeeds.innerText = "a loner " + "(" + socialNeedsValue + ")";
            break;

        case 3:
            socialNeeds.innerText = "indifferent " + "(" + socialNeedsValue + ")";
            break;

        case 4:
            socialNeeds.innerText = "needs friends " + "(" + socialNeedsValue + ")";
            break;

        case 5:
            socialNeeds.innerText = "very needy " + "(" + socialNeedsValue + ")";
            break;
    }
}