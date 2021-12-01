//#region ***  DOM references                           ***********

let pokémonSprite, movelistlvl, movelistegg, movelisttutor, movelisttm, totBaseStats, PokémonList, PokémonType, NextPokémon, PreviousPokémon, ShinyToggle;
let chart;
let number;
let pokéimage;
let pokéimageshiny;
let pokéimagepixel;
let pokéimagepixelshiny;
//#endregion

//#region ***  Callback-Visualisation - show___         ***********
const showPokémon = function (jsonObject) {
  pokéimage = jsonObject.sprites.other['home']['front_default'];

  if (number > 1) {
    PreviousPokémon.classList.remove('c-nav__disepear');
  }
  if (number <= 1) {
    PreviousPokémon.classList.add('c-nav__disepear');
  }
  if (number >= 649) {
    NextPokémon.classList.add('c-nav__disepear');
  }

  console.log(jsonObject);
  const arr = jsonObject.name.split('');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const name = jsonObject.name.charAt(0).toUpperCase() + jsonObject.name.slice(1);

  let info = `<div class="c-name"><p>${name}</p>                                
  <input class="o-hide-accessible c-option c-option--hidden js-shinyToggle" type="checkbox"
  id="checkbox1">
<label class="c-label c-label--option c-custom-option" for="checkbox1">
  <span>
  <svg class="js-shiny c-shiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g class="c-shinySparkle js-shinySparkle">
    <path d="M97.11,62c0,1-.82,1.44-1.62,1.71-2,.68-4,1.29-6,1.93a37.5,37.5,0,0,0-20.42,16,53.44,53.44,0,0,0-5.79,13.6,11.44,11.44,0,0,1-.92,2.49,1.44,1.44,0,0,1-1.33.85,1.29,1.29,0,0,1-1.14-1c-.71-2.1-1.5-4.18-2.13-6.31C54.84,81.47,49.26,73.94,40.19,69a83.43,83.43,0,0,0-13.06-5.78c-1-.33-1.73-.89-1.69-2s1-1.36,1.85-1.6c3.67-1,7.48-1.45,11-3.2A33,33,0,0,0,53.82,39.93a110.23,110.23,0,0,0,5-13.95c.34-1.1.57-2.45,2-2.52s2.12,1.18,2.5,2.33c1,2.84,1.83,5.71,2.6,8.6C68,42.14,71.82,48.74,78.39,53.54c3.17,2.33,6.94,3.44,10.48,5a37,37,0,0,0,6.55,1.92C96.28,60.7,97,61,97.11,62Z"/>
    <path d="M80.47,101.4a2.5,2.5,0,0,1,2.12,1.89A76,76,0,0,1,85.28,112c1.75,6.43,4.52,12.28,9.49,16.91a24.3,24.3,0,0,0,7.56,5.06c4.12,1.63,8.1,3.68,12.54,4.41.8.13,1.54.48,1.62,1.41a1.69,1.69,0,0,1-1.32,1.73c-2.09.74-4.22,1.34-6.32,2.07a37.71,37.71,0,0,0-22.52,20,60.18,60.18,0,0,0-4,10.77,5.73,5.73,0,0,1-.59,1.37,1.34,1.34,0,0,1-1.34.81,1.36,1.36,0,0,1-1.14-1.08c-.75-2.21-1.58-4.39-2.22-6.63a35.24,35.24,0,0,0-15-20.49,62.93,62.93,0,0,0-15-7,7.33,7.33,0,0,1-1.23-.49,1.67,1.67,0,0,1-.9-1.66,1.45,1.45,0,0,1,1.22-1.39c1.56-.4,3.12-.83,4.7-1.15,9.38-1.87,16.13-7.32,20.77-15.5a73.53,73.53,0,0,0,6.59-17C78.51,102.82,78.83,101.53,80.47,101.4Z"/>
    <path d="M138.51,61.94a2.37,2.37,0,0,1,2.05,1.58A38.92,38.92,0,0,1,142.67,70a68.37,68.37,0,0,0,3.23,9.62,29.55,29.55,0,0,0,17.32,16.07c3.18,1.16,6.26,2.57,9.61,3.21.85.16,1.68.44,1.73,1.48a1.83,1.83,0,0,1-1.46,1.81c-2,.71-4.13,1.29-6.18,2a37.65,37.65,0,0,0-23.26,21.66,57.55,57.55,0,0,0-3.14,8.95,5,5,0,0,1-.43,1.08c-.33.64-.69,1.33-1.59,1.22s-1-.79-1.2-1.43c-1.45-4.13-2.47-8.41-4.46-12.35a35.2,35.2,0,0,0-14.54-15.55,85.52,85.52,0,0,0-13.8-6.15c-.9-.3-1.61-.86-1.51-1.93s.79-1.36,1.69-1.54c1.36-.27,2.7-.67,4.06-.94,10.28-2.11,17.31-8.26,22-17.47a85.18,85.18,0,0,0,5.68-15.45C136.7,63.11,137.12,62,138.51,61.94Z"/>
  </g>
  </svg>
  </span>     
</div>
<div class=" c-pokémon__img " id="image">
<input class="o-hide-accessible c-option c-option--hidden js-shinyToggle" type="checkbox"
id="checkbox2">
<label class="c-label c-label--option c-custom-option" for="checkbox2">
<span>
<img class="c-pokémon__sprite js-pokémonsprite " id ="sprite" src="${pokéimage}" alt="">
</span>
</div>`;
  Pokémon.innerHTML = info;
  gsap.fromTo('.c-pokémon__sprite', { scale: 0.7 }, { scale: 1, ease: Elastic.easeOut, duration: 1 });

  ListenToClickShiny(jsonObject);

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

const ShowEggMoves = async function (Jsonmoves) {
  let htmlmoveegg = '<tr><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>';

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
    if (x.move_learn_method.name == 'egg') {
      htmlmoveegg += `<tr>
                  <td>${move.move.name}</td>
                  <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                  <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                  `;
      if (moveinfo.power != null) {
        htmlmoveegg += ` <td>${moveinfo.power}</td>`;
      } else htmlmoveegg += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmoveegg += ` <td>${moveinfo.accuracy}%</td>`;
      } else htmlmoveegg += ` <td> -- %</td>`;
      htmlmoveegg += ` 
                  <td>${moveinfo.pp}</td>
              </tr>`;
    }
  }
  movelistegg.innerHTML = htmlmoveegg;
  let length = document.querySelector('.js-movelistegg').rows.length;
  if (length - 1 == 0) {
    htmlmoveegg += `                <tr>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--%</td>
    <td>--</td>
  </tr>`;
    movelistegg.innerHTML = htmlmoveegg;
  }
  console.log('Egg Moves Loaded.' + length);
};
const ShowTmMoves = async function (Jsonmoves) {
  let htmlmovetm = '<tr><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>';

  const pokeData = Jsonmoves;
  // filter out moves that aren't in ultra-sun/ultra-moon
  pokeData['moves'] = pokeData['moves'].filter((x) => x['version_group_details'].at(-1)['version_group']['name'] === 'ultra-sun-ultra-moon');
  // sort moves based on level_learned_at (or first if egg)
  // pokeData['moves'] = pokeData['moves'].sort((a, b) => {
  //   let x = a['version_group_details'].at(-1); // select lastest version of move (ultra-sun/ultra-moon)
  //   let y = b['version_group_details'].at(-1);
  //   return x['move_learn_method']['name'] == 'egg' ? -1 : x['level_learned_at'] - y['level_learned_at'];
  // });

  for (const move of pokeData.moves) {
    const MoveInfoUrl = `https://pokeapi.co/api/v2/move/${move.move.name}`;
    const responsemoveinfo = await fetch(MoveInfoUrl); // Met de fetch API proberen we de data op te halen.
    var moveinfo = await responsemoveinfo.json();
    // get latest version of move (ultra-sun/ultra-moon)
    let x = move['version_group_details'].at(-1);
    if (x.move_learn_method.name == 'machine') {
      htmlmovetm += `<tr>
                    <td>${move.move.name}</td>
                    <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                    <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                    `;
      if (moveinfo.power != null) {
        htmlmovetm += ` <td>${moveinfo.power}</td>`;
      } else htmlmovetm += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmovetm += ` <td>${moveinfo.accuracy}%</td>`;
      } else htmlmovetm += ` <td> -- %</td>`;
      htmlmovetm += ` 
                    <td>${moveinfo.pp}</td>
                </tr>`;
    }
  }
  movelisttm.innerHTML = htmlmovetm;
  let length = document.querySelector('.js-movelisttm').rows.length;
  if (length - 1 == 0) {
    htmlmovetm += `                <tr>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--%</td>
    <td>--</td>
  </tr>`;
    movelisttm.innerHTML = htmlmovetm;
  }
  console.log('TM Moves Loaded.');
};
const ShowTutorMoves = async function (Jsonmoves) {
  let htmlmovetutor = '<tr><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>';

  const pokeData = Jsonmoves;
  // filter out moves that aren't in ultra-sun/ultra-moon
  pokeData['moves'] = pokeData['moves'].filter((x) => x['version_group_details'].at(-1)['version_group']['name'] === 'ultra-sun-ultra-moon');
  // // sort moves based on level_learned_at (or first if egg)
  // pokeData['moves'] = pokeData['moves'].sort((a, b) => {
  //   let x = a['version_group_details'].at(-1); // select lastest version of move (ultra-sun/ultra-moon)
  //   let y = b['version_group_details'].at(-1);
  //   return x['move_learn_method']['name'] == 'egg' ? -1 : x['level_learned_at'] - y['level_learned_at'];
  // });

  for (const move of pokeData.moves) {
    const MoveInfoUrl = `https://pokeapi.co/api/v2/move/${move.move.name}`;
    const responsemoveinfo = await fetch(MoveInfoUrl); // Met de fetch API proberen we de data op te halen.
    var moveinfo = await responsemoveinfo.json();
    // get latest version of move (ultra-sun/ultra-moon)
    let x = move['version_group_details'].at(-1);
    if (x.move_learn_method.name == 'tutor') {
      htmlmovetutor += `<tr>
                      <td>${move.move.name}</td>
                      <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                      <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                      `;
      if (moveinfo.power != null) {
        htmlmovetutor += ` <td>${moveinfo.power}</td>`;
      } else htmlmovetutor += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmovetutor += ` <td>${moveinfo.accuracy}%</td>`;
      } else htmlmovetutor += ` <td> -- %</td>`;
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
  }
  movelisttutor.innerHTML = htmlmovetutor;
  let length = document.querySelector('.js-movelisttutor').rows.length;
  if (length - 1 == 0) {
    htmlmovetutor += `                <tr>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--%</td>
    <td>--</td>
  </tr>`;
    movelisttutor.innerHTML = htmlmovetutor;
  }
  console.log('Tutor Moves Loaded.');
};
const ShowLvlMoves = async function (Jsonmoves) {
  let htmlmovelvl = `<tr><th>Level</th><th>Move</th><th>Type</th><th>Cat.</th><th>Pwr.</th><th>Acc.</th><th>PP</th></tr>`;
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
      
      <tr>
                          <td>${x.level_learned_at}</td>
                          <td>${move.move.name}</td>
                          <td class="c-type-${moveinfo.type.name}">${moveinfo.type.name}</td>
                          <td class="js-damageClass c-${moveinfo.damage_class.name}">${moveinfo.damage_class.name}</td>
                          `;
      if (moveinfo.power != null) {
        htmlmovelvl += ` <td>${moveinfo.power}</td>`;
      } else htmlmovelvl += ` <td> -- </td>`;
      if (moveinfo.accuracy != null) {
        htmlmovelvl += ` <td>${moveinfo.accuracy}%</td>`;
      } else htmlmovelvl += ` <td> -- %</td>`;
      htmlmovelvl += ` 
                          <td>${moveinfo.pp}</td>
                      </tr>`;
    }
  }
  movelistlvl.innerHTML = htmlmovelvl;
  let length = document.querySelector('.js-movelistlevel').rows.length;
  if (length - 1 == 0) {
    htmlmovelvl += `                <tr>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--</td>
    <td>--%</td>
    <td>--</td>
  </tr>`;
    movelistlvl.innerHTML = htmlmovelvl;
  }
  console.log('Level Moves Loaded.');
};
//#endregion

//#region ***  Data Access - get___                     ***********
const getAllPokémon = async () => {
  // Eerst bouwen we onze url op;
  const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=649`;
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
    .then((data) => {
      ShowEggMoves(data), ShowTutorMoves(data), ShowLvlMoves(data), ShowTmMoves(data), showPokémon(data), showPokémonStats(data);
    });
};
//#endregion
//#region ***  Event Listeners - listenTo___            ***********
const ListenToClickShiny = function (info) {
  console.log(pokémonSprite);

  let checkbox2 = document.getElementById('checkbox2');
  let checkbox1 = document.getElementById('checkbox1');
  pokéimage = info.sprites.other['home']['front_default'];
  pokéimageshiny = info.sprites.other['home']['front_shiny'];
  pokéimagepixel = info.sprites.versions['generation-v']['black-white']['animated']['front_default'];
  pokéimagepixelshiny = info.sprites.versions['generation-v']['black-white']['animated']['front_shiny'];
  let sprite = document.getElementById('sprite');

  document.querySelector('.js-pokémonsprite').addEventListener('click', function () {
    console.log(checkbox2.checked);
    console.log(checkbox1.checked);
    if (checkbox2.checked == false && checkbox1.checked == false) {
      sprite.src = pokéimagepixel;
      console.log('click');
      let tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: -10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: 10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
    }
    if (checkbox2.checked == true && checkbox1.checked == false) {
      sprite.src = pokéimage;
      let tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: -10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: 10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
    }
    if (checkbox2.checked == true && checkbox1.checked == true) {
      sprite.src = pokéimageshiny;
      let tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: -10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: 10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
    }
    if (checkbox2.checked == false && checkbox1.checked == true) {
      sprite.src = pokéimagepixelshiny;
      let tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: -10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
      tl.fromTo('.c-pokémon__sprite', { x: 0 }, { x: 10, ease: 'Power2.easeOut', duration: 0.1 }, '<');
    }
  });

  document.querySelector('.js-shiny').addEventListener('click', function () {
    console.log(checkbox1.checked);
    if (checkbox1.checked == true && checkbox2.checked == false) {
      gsap.fromTo('.c-shiny', { scale: 0 }, { scale: 1, ease: Elastic.easeOut, duration: 1 });
      let tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { y: 0 }, { y: -30, ease: 'Power2.easeOut', duration: 0.5 }, '<');

      sprite.src = pokéimage;
      console.log('not checked');
      console.log(sprite.src);
    }
    if (checkbox1.checked == false && checkbox2.checked == false) {
      gsap.fromTo('.c-shiny', { scale: 0 }, { scale: 1, ease: Elastic.easeOut, duration: 1 });
      let tl = gsap.timeline({
        repeat: 1,

        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { y: 0 }, { y: -30, ease: 'Power2.easeOut', duration: 0.5 }, '<');

      sprite.src = pokéimageshiny;
      console.log('checked');
      console.log(sprite.src);
    }
    if (checkbox1.checked == true && checkbox2.checked == true) {
      gsap.fromTo('.c-shiny', { scale: 0 }, { scale: 1, ease: Elastic.easeOut, duration: 1 });
      let tl = gsap.timeline({
        repeat: 1,

        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { y: 0 }, { y: -30, ease: 'Power2.easeOut', duration: 0.5 }, '<');

      sprite.src = pokéimagepixel;
      console.log('checked');
      console.log(sprite.src);
    }
    if (checkbox1.checked == false && checkbox2.checked == true) {
      gsap.fromTo('.c-shiny', { scale: 0 }, { scale: 1, ease: Elastic.easeOut, duration: 1 });
      let tl = gsap.timeline({
        repeat: 1,

        yoyo: true,
      });
      tl.fromTo('.c-pokémon__sprite', { y: 0 }, { y: -30, ease: 'Power2.easeOut', duration: 0.5 }, '<');
      console.log(pokéimagepixelshiny);
      sprite.src = pokéimagepixelshiny;

      console.log('checked');
      console.log(sprite.src);
    }
  });
};
const ListenToSelectPokémon = function () {
  PokémonList.addEventListener('change', function () {
    getPokémon(this.value);
  });
};
const ListenToClickNav = function () {
  NextPokémon.addEventListener('click', function () {
    number++;
    console.log('Current Pokémon Number:' + number);
    PokémonList.selectedIndex++;
    console.log('Current Index Number:' + PokémonList.selectedIndex);
    getPokémon(number);

    gsap.fromTo('.c-nav__next', { scale: 0.7 }, { scale: 1, ease: Elastic.easeOut, duration: 1.5 });
  });
  PreviousPokémon.addEventListener('click', function () {
    if (number > 1) {
      number--;
      console.log('Current Pokémon Number:' + number);
      PokémonList.selectedIndex--;
      console.log('Current Index Number:' + PokémonList.selectedIndex);
    }
    gsap.fromTo('.c-nav__back', { scale: 0.7 }, { scale: 1, ease: Elastic.easeOut, duration: 1.5 });

    getPokémon(number);
  });
};
//#endregion

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
  Pokémon = document.querySelector('.js-pokémon');
  pokémonSprite = document.querySelector('.js-pokémonsprite');
  movelistlvl = document.querySelector('.js-movelistlevel');
  movelistegg = document.querySelector('.js-movelistegg');
  movelisttutor = document.querySelector('.js-movelisttutor');
  movelisttm = document.querySelector('.js-movelisttm');
  totBaseStats = document.querySelector('.js-totstats');
  PokémonList = document.querySelector('.js-select');
  PokémonType = document.querySelector('.js-types');
  NextPokémon = document.querySelector('.js-next');
  PreviousPokémon = document.querySelector('.js-back');
  ShinyToggle = document.querySelector('.js-shinyToggle');
  ListenToClickNav();
  getPokémon(1);
  ListenToSelectPokémon();
  drawGraph();
  getAllPokémon();
};
document.addEventListener('DOMContentLoaded', init);
//#endregion
