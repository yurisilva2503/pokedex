const html = document.documentElement;
const form = html.querySelector("#form");
const btn_search = form.querySelector("#search");
const input = form.querySelector("#pokemon-input");
const card_container = html.querySelector(".card-container");
const pokemon_image_container = card_container.querySelector(
  ".pokemon-image_container"
);
const pokemon_image = pokemon_image_container.querySelector(".pokemon-image");
const pokemon_number =
  pokemon_image_container.querySelector(".pokemon-number p");
const pokemon_description = card_container.querySelector(
  ".pokemon-description"
);
const pokemon_name_and_type = pokemon_description.querySelector(
  ".pokemon-name_and_type"
);
const pokemon_name = pokemon_name_and_type.querySelector(".name h1");
const pokemon_type = pokemon_name_and_type.querySelector(".type");
const pokemon_type_1 = pokemon_name_and_type.querySelector(".type .type_1");
const pokemon_type_2 = pokemon_name_and_type.querySelector(".type .type_2");
const pokemon_base_experience = pokemon_description.querySelector(
  ".pokemon-base_experience h3"
);
const pokemon_stats = pokemon_description.querySelector(".pokemon-stats");
const pokemon_stats_container = pokemon_stats.querySelector(".stats-container");
const pokemon_stats_hp = pokemon_stats_container.querySelector("#hp p");
const pokemon_stats_atk = pokemon_stats_container.querySelector("#attack p");
const pokemon_stats_def = pokemon_stats_container.querySelector("#defense p");
const pokemon_stats_satk = pokemon_stats_container.querySelector("#sattack p");
const pokemon_stats_sdef = pokemon_stats_container.querySelector("#sdefense p");
const pokemon_stats_spd = pokemon_stats_container.querySelector("#speed p");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

btn_search.addEventListener("click", () => {
  const name = input.value;
  pokemon(removeSpacesandToLowerCase(name));
  input.value = "";
});

function removeSpacesandToLowerCase(text) {
  text = text.replace(/\s/g, "");
  text = text.toLowerCase();
  return text;
}

const pokemon = async (name) => {
  try {
    let data;
    // Verificar se os dados já estão em cache
    const cachedData = localStorage.getItem(name);
    if (cachedData) {
      data = JSON.parse(cachedData);
    } else {
      // Se não estiver em cache, fazer uma solicitação à API
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      data = await response.json();
      
      // Armazenar os dados em cache
      localStorage.setItem(name, JSON.stringify(data));
    }
    //Inserindo os dados no HTML
    //Pokemon Image
    pokemon_image.style.backgroundImage = `url('https://raw.githubusercontent.com/yurisilva2503/pokedex/main/images/pokemons/poke_${data.id}.gif')`;

    //Pokemon Number
    pokemon_number.textContent = data.id;
    if (pokemon_number.textContent < 10) {
      pokemon_number.textContent = "00" + pokemon_number.textContent;
    } else if (pokemon_number.textContent < 100) {
      pokemon_number.textContent = "0" + pokemon_number.textContent;
    }

    //Pokemon Name
    pokemon_name.textContent =
      data.name.charAt(0).toUpperCase() + data.name.slice(1);

    //Pokemon Type
    if (data.types.length > 1) {
      pokemon_type_1.textContent =
        data.types[0].type.name.charAt(0).toUpperCase() +
        data.types[0].type.name.slice(1);
      pokemon_type_2.textContent =
        data.types[1].type.name.charAt(0).toUpperCase() +
        data.types[1].type.name.slice(1);
    } else {
      pokemon_type_1.textContent =
        data.types[0].type.name.charAt(0).toUpperCase() +
        data.types[0].type.name.slice(1);
      pokemon_type_2.style.display = "none";
    }

    //Pokemon base_experience
    pokemon_base_experience.textContent =
      "Base experience: " + data.base_experience;

    //Pokemon Hp
    pokemon_stats_hp.textContent = data.stats[0].base_stat;

    //Pokemon Attack
    pokemon_stats_atk.textContent = data.stats[1].base_stat;

    //Pokemon Defense
    pokemon_stats_def.textContent = data.stats[2].base_stat;

    //Pokemon Special Attack
    pokemon_stats_satk.textContent = data.stats[3].base_stat;

    //Pokemon Special Defense
    pokemon_stats_sdef.textContent = data.stats[4].base_stat;

    //Pokemon Speed
    pokemon_stats_spd.textContent = data.stats[5].base_stat;
  } catch (err) {
    console.log({ err });
  }
};
