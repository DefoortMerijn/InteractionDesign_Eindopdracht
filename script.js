let pokémonImage, movelistlvl, movelistegg, movelisttutor, movelisttm, totBaseStats, PokémonList, PokémonType, NextPokémon, PreviousPokémon;
let number;
let physicalClass = 'c-physical';
let specialClass = 'c-special';
let statusClass = 'c-status';

const getAllPokémon = async () => {
  // Eerst bouwen we onze url op;
  const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=898`;
  await fetch(endpoint) // Met de fetch API proberen we de data op te halen.
    .then((response) => response.json())
    .then((data) => showPokémonList(data));
  console.log('Sending data');
};
const getPokémon = async (pokemon) => {
  // Eerst bouwen we onze url op
  number = PokémonList.value;

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
  if (number > 1) {
    PreviousPokémon.classList.remove('c-disepear');
  }
  if (number <= 1) {
    PreviousPokémon.classList.add('c-disepear');
  }
  console.log(jsonObject);
  const arr = jsonObject.name.split('');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const name = jsonObject.name.charAt(0).toUpperCase() + jsonObject.name.slice(1);
  const pokéimage = jsonObject.sprites.versions['generation-vii']['ultra-sun-ultra-moon']['front_default'];
  let image = `<p>${name}</p><div class="js-pokémon c-pokémonimg"><img class="c-pokésprite"src="${pokéimage}" alt=""></img>`;

  pokémonImage.innerHTML = image;
  gsap.fromTo('.c-pokésprite', { scale: 2 }, { scale: 1, ease: Elastic.easeOut, duration: 0.1 });
  let htmltypes = '';
  for (const type of jsonObject.types) {
    htmltypes += `<li class="c-type-${type.type.name} c-type">${type.type.name}</li>`;
    PokémonType.innerHTML = htmltypes;
  }
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

const showPokémonList = function (data) {
  console.log(data);
  let htmlList = '';
  let index = 001;
  let optionvalue = 1;

  for (const pokémon of data.results) {
    const arr = pokémon.name.split('');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const name = pokémon.name.charAt(0).toUpperCase() + pokémon.name.slice(1);
    if (index.toString().length == 1) {
      htmlList += ` <option value="${optionvalue}">00${index}: ${name}</option>`;
    }
    if (index.toString().length == 2) {
      htmlList += ` <option value="${optionvalue}">0${index}: ${name}</option>`;
    }
    if (index.toString().length == 3) {
      htmlList += ` <option value="${optionvalue}">${index}: ${name}</option>`;
    }
    optionvalue++;
    index++;
  }

  PokémonList.innerHTML = htmlList;
};
const showPokémonMoves = async function (Jsonmoves) {
  // console.log(method);
  console.log('Loading moves');
  let htmlmovelvl = `<tr><th>Level</th><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>`;
  let htmlmoveegg = '<tr><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>';
  let htmlmovetutor = '<tr><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>';
  let htmlmovetm = '<tr><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>';
  const pokeData = Jsonmoves;
  // filter out moves that aren't in ultra-sun/ultra-moon
  pokeData['moves'] = pokeData['moves'].filter((x) => x['version_group_details'].at(-1)['version_group']['name'] === 'ultra-sun-ultra-moon');
  // sort moves based on level_learned_at (or first if egg)
  pokeData['moves'] = pokeData['moves'].sort((a, b) => {
    let x = a['version_group_details'].at(-1); // select lastest version of move (ultra-sun/ultra-moon)
    let y = b['version_group_details'].at(-1);
    return x['move_learn_method']['name'] == 'egg' ? -1 : x['level_learned_at'] - y['level_learned_at'];
  });

  for (const move of pokeData.moves) {
    const MoveInfoUrl = `https://pokeapi.co/api/v2/move/${move.move.name}`;
    const responsemoveinfo = await fetch(MoveInfoUrl); // Met de fetch API proberen we de data op te halen.
    var moveinfo = await responsemoveinfo.json();
    // get latest version of move (ultra-sun/ultra-moon)
    let x = move['version_group_details'].at(-1);

    if (x.move_learn_method.name == 'level-up') {
      htmlmovelvl += `
      
      <tr class="c-move">
                          <td>${x.level_learned_at}</td>
                          <td class="c-move-name">${move.move.name}</td>
                          <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                          <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                          `;
      if (moveinfo.power != null) {
        htmlmovelvl += ` <td>${moveinfo.power}</td>`;
      } else htmlmovelvl += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmovelvl += ` <td>${moveinfo.accuracy}</td>`;
      } else htmlmovelvl += ` <td> -- </td>`;
      htmlmovelvl += ` 
                          <td>${moveinfo.pp}</td>
                      </tr>`;
    }

    if (x.move_learn_method.name == 'egg') {
      htmlmoveegg += `<tr class="c-move">
                          <td class="c-move-name">${move.move.name}</td>
                          <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                          <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                          `;
      if (moveinfo.power != null) {
        htmlmoveegg += ` <td>${moveinfo.power}</td>`;
      } else htmlmoveegg += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmoveegg += ` <td>${moveinfo.accuracy}</td>`;
      } else htmlmoveegg += ` <td> -- </td>`;
      htmlmoveegg += ` 
                          <td>${moveinfo.pp}</td>
                      </tr>`;
    }

    if (x.move_learn_method.name == 'tutor') {
      htmlmovetutor += `<tr class="c-move">
                          <td class="c-move-name">${move.move.name}</td>
                          <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                          <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                          `;
      if (moveinfo.power != null) {
        htmlmovetutor += ` <td>${moveinfo.power}</td>`;
      } else htmlmovetutor += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmovetutor += ` <td>${moveinfo.accuracy}</td>`;
      } else htmlmovetutor += ` <td> -- </td>`;
      htmlmovetutor += ` 
                          <td>${moveinfo.pp}</td>
                      </tr>`;
      // if (moveinfo.damage_class.name == 'physical') {
      //   htmlmovetutor += `<td class="js-damageClass ${physicalClass}">${moveinfo.damage_class.name}</td>`;
      // } else if (moveinfo.damage_class.name == 'special') {
      //   htmlmovetutor += `<td class="js-damageClass ${specialClass}">${moveinfo.damage_class.name}</td>`;
      // } else if (moveinfo.damage_class.name == 'status') {
      //   htmlmovetutor += `<td class="js-damageClass ${statusClass}">${moveinfo.damage_class.name}</td>`;
      // }
    }
    if (x.move_learn_method.name == 'machine') {
      htmlmovetm += `<tr class="c-move">
                        <td class="c-move-name">${move.move.name}</td>
                        <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                        <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                        `;
      if (moveinfo.power != null) {
        htmlmovetm += ` <td>${moveinfo.power}</td>`;
      } else htmlmovetm += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmovetm += ` <td>${moveinfo.accuracy}</td>`;
      } else htmlmovetm += ` <td> -- </td>`;
      htmlmovetm += ` 
                        <td>${moveinfo.pp}</td>
                    </tr>`;
    }
  }
  movelistlvl.innerHTML = htmlmovelvl;
  movelistegg.innerHTML = htmlmoveegg;
  movelisttutor.innerHTML = htmlmovetutor;
  movelisttm.innerHTML = htmlmovetm;
};

function SelectPokémon() {
  PokémonList.addEventListener('change', function () {
    getPokémon(this.value);
    getMoves(this.value);
    getStats(this.value);
  });
}

const ListenToClickNav = function () {
  NextPokémon.addEventListener('click', function () {
    number++;
    console.log(number);
    PokémonList.selectedIndex++;
    getPokémon(number);
    getMoves(number);
    getStats(number);
    gsap.fromTo('.c-next', { scale: 0.7 }, { scale: 1, ease: Elastic.easeOut, duration: 1 });
  });
  PreviousPokémon.addEventListener('click', function () {
    if (number > 1) {
      number--;
      console.log(number);
      PokémonList.selectedIndex--;
    }
    gsap.fromTo('.c-back', { scale: 0.7 }, { scale: 1, ease: Elastic.easeOut, duration: 1 });

    getPokémon(number);
    getMoves(number);
    getStats(number);
  });
};

const init = function () {
  pokémonImage = document.querySelector('.js-pokémon');
  movelistlvl = document.querySelector('.js-movelistlevel');
  movelistegg = document.querySelector('.js-movelistegg');
  movelisttutor = document.querySelector('.js-movelisttutor');
  movelisttm = document.querySelector('.js-movelisttm');
  totBaseStats = document.querySelector('.js-totstats');
  PokémonList = document.querySelector('.js-select');
  PokémonType = document.querySelector('.js-types');
  NextPokémon = document.querySelector('.js-next');
  PreviousPokémon = document.querySelector('.js-back');
  ListenToClickNav();
  getPokémon(1);
  SelectPokémon();
  getMoves(1);
  getStats(1);
  drawGraph();
  getAllPokémon();

  // SelectPokémonMoveMethod();
};
document.addEventListener('DOMContentLoaded', init);
