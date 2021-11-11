let pokémonImage, movelistlvl, movelistegg, movelisttutor, movelisttm, totBaseStats;
let chart;

const getPokémon = async (pokemon) => {
  // Eerst bouwen we onze url op

  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  await fetch(endpoint) // Met de fetch API proberen we de data op te halen.
    .then((response) => response.json())
    .then((data) => showPokémonImage(data));
};

const getMoves = async (pokemon) => {
  // Eerst bouwen we onze url op;
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  await fetch(endpoint) // Met de fetch API proberen we de data op te halen.
    .then((response) => response.json())
    .then((data) => showPokémonMoves(data));
  console.log('Sending data');
};

const getStats = async (pokemon) => {
  // Eerst bouwen we onze url op;
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  await fetch(endpoint) // Met de fetch API proberen we de data op te halen.
    .then((response) => response.json())
    .then((data) => showPokémonStats(data));
  console.log('Sending data');
};

const showPokémonImage = function (jsonObject) {
  console.log(jsonObject);
  const arr = jsonObject.name.split('');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const name = jsonObject.name.charAt(0).toUpperCase() + jsonObject.name.slice(1);
  const pokéimage = jsonObject.sprites.versions['generation-vii']['ultra-sun-ultra-moon']['front_default'];
  let image = `<p>${name}</p><div class="js-pokémon c-pokémonimg"><img class="c-pokésprite"src="${pokéimage}" alt=""></img>`;
  pokémonImage.innerHTML = image;
};

const showPokémonStats = function (jsonObject) {
  let status = '{"stats" : [';
  for (const stat of jsonObject.stats) {
    const arr = stat['stat']['name'].split('-');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const base_stat = stat['stat']['name'].charAt(0).toUpperCase() + stat['stat']['name'].slice(1);
    if (stat['stat']['name'] == 'speed') {
      status += `{"name": "${base_stat}", "stat":"${stat['base_stat']}"}`;
    } else {
      status += `{"name": "${base_stat}", "stat":"${stat['base_stat']}"},`;
    }
  }
  status += ']}';
  const statsJson = JSON.parse(status);
  console.log(statsJson['stats'][1].stat);

  let sum = 0;

  for (let i = 0; i < 6; i++) {
    sum += parseInt(statsJson['stats'][i].stat);
  }
  console.log(sum);
  let htmlbasestats = `<h3>Base stat Total: ${sum}</h3>`;
  totBaseStats.innerHTML = htmlbasestats;
  showBaseStats(statsJson);
};

const showBaseStats = function (data) {
  let converted_labels = [];
  let converted_data = [];
  for (const stat of data.stats) {
    console.log(stat['stat']);
    converted_data.push(stat['stat']);
    converted_labels.push(stat['name']);
  }
  drawBaseStats(converted_labels, converted_data);
};
const drawBaseStats = function (labels, data) {
  console.log(data);
  console.log(labels);
  chart.updateOptions({
    series: [
      {
        name: 'stat',
        data: data,
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      background: '#FFFFFF',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    colors: ['#FF0000', '#F08030', '#F8D030', '#6890F0', '#78C850', '#F85888'],
    dataLabels: {
      enabled: true,
      offsetX: 20,
      textAnchor: 'middle',
      style: {
        fontWeight: 'bold',
        colors: ['#000000'],
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      labels: { show: false },

      type: 'category',
      min: 0,
      max: 255,
      categories: labels,
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '11px',
          fontWeight: 'bold',
          colors: ['#000000'],
        },
      },
    },
  });
};
const drawGraph = function () {
  var options = {
    series: [],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
  };

  chart = new ApexCharts(document.querySelector('.js-stats'), options);
  chart.render();
};

const showPokémonMoves = function (jsonObject) {
  // console.log(method);
  let htmlmovelvl = '';
  let htmlmoveegg = '';
  let htmlmovetutor = '';
  let htmlmovetm = '';
  const pokeData = jsonObject;
  // filter out moves that aren't in ultra-sun/ultra-moon
  pokeData['moves'] = pokeData['moves'].filter((x) => x['version_group_details'].at(-1)['version_group']['name'] === 'ultra-sun-ultra-moon');
  // sort moves based on level_learned_at (or first if egg)
  pokeData['moves'] = pokeData['moves'].sort((a, b) => {
    let x = a['version_group_details'].at(-1); // select lastest version of move (ultra-sun/ultra-moon)
    let y = b['version_group_details'].at(-1);
    return x['move_learn_method']['name'] == 'egg' ? -1 : x['level_learned_at'] - y['level_learned_at'];
  });

  for (const move of pokeData.moves) {
    // get latest version of move (ultra-sun/ultra-moon)
    let x = move['version_group_details'].at(-1);
    if (x.move_learn_method.name == 'level-up') {
      htmlmovelvl += `<li class="c-move">
                          <p>Name: </br>${move.move.name}</p>
                          <p>learned at lvl: </br>${x.level_learned_at}</p>
                          <p class="c-move--learnmethod">learning method: </br>${x.move_learn_method.name}</p>
          </li>`;
    }
    if (x.move_learn_method.name == 'egg') {
      htmlmoveegg += `<li class="c-move">
                          <p>Name: </br>${move.move.name}</p>
                          <p>learned at lvl: </br>${x.level_learned_at}</p>
                          <p class="c-move--learnmethod">learning method: </br>${x.move_learn_method.name}</p>
          </li>`;
    }
    if (x.move_learn_method.name == 'tutor') {
      htmlmovetutor += `<li class="c-move">
                          <p>Name: </br>${move.move.name}</p>
                          <p>learned at lvl: </br>${x.level_learned_at}</p>
                          <p class="c-move--learnmethod">learning method: </br>${x.move_learn_method.name}</p>
          </li>`;
    }
    if (x.move_learn_method.name == 'machine') {
      htmlmovetm += `<li class="c-move">
                          <p>Name: </br>${move.move.name}</p>
                          <p>learned at lvl: </br>${x.level_learned_at}</p>
                          <p class="c-move--learnmethod">learning method: </br>${x.move_learn_method.name}</p>
          </li>`;
    }
  }
  movelistlvl.innerHTML = htmlmovelvl;
  movelistegg.innerHTML = htmlmoveegg;
  movelisttutor.innerHTML = htmlmovetutor;
  movelisttm.innerHTML = htmlmovetm;
};

function SelectPokémon() {
  document.querySelector('.js-select').addEventListener('change', function () {
    getPokémon(this.value);
    getMoves(this.value);
    getStats(this.value);
  });
}

const init = function () {
  pokémonImage = document.querySelector('.js-pokémon');
  movelistlvl = document.querySelector('.js-movelistlevel');
  movelistegg = document.querySelector('.js-movelistegg');
  movelisttutor = document.querySelector('.js-movelisttutor');
  movelisttm = document.querySelector('.js-movelisttm');
  totBaseStats = document.querySelector('.js-totstats');
  getPokémon(1);
  getMoves(1);
  getStats(1);
  drawGraph();
  SelectPokémon();
  // SelectPokémonMoveMethod();
};
document.addEventListener('DOMContentLoaded', init);
