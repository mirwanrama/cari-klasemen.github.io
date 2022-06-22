const kelasemenBody = document.querySelector('.kelasemen');
let table = document.getElementsByTagName('table')[0];
const searchButton = document.querySelector('.button-search');
const inputValue = document.querySelector('.input-value');
const resetButton = document.querySelector('.button-reset');


function createTitle() {

  const leagueNameElement = document.createElement('h1');
  const leagueNameTitle = document.createTextNode('English Premier League');
  leagueNameElement.appendChild(leagueNameTitle);
  kelasemenBody.insertBefore(leagueNameElement, table);

  const leagueYearElement = document.createElement('h3');
  const leagueYearTitle = document.createTextNode(`${inputValue.value} - ${parseInt(inputValue.value) + 1}`);
  leagueYearElement.appendChild(leagueYearTitle);
  kelasemenBody.insertBefore(leagueYearElement, table);

};

searchButton.addEventListener('click', async function () {
  createTitle();
  try {
    const klasemen = await getKlasemen(inputValue.value);
  } catch (err) {
    alert(err);
  }

});

function getKlasemen() {

  return fetch('https://api-football-standings.azharimm.site/leagues/eng.1/standings?season=' + inputValue.value)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(response => {
      const klasemen = response.data.standings;
      insertTable(klasemen);
    })

};

function insertTable(klasemen) {

  klasemen.forEach(k => {
    createTable(k)
  });

};

function createTable(k) {

  let newRow = table.insertRow(table.rows.length);

  // tambah cell pada baris baru
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);
  let cell6 = newRow.insertCell(5);
  let cell7 = newRow.insertCell(6);
  let cell8 = newRow.insertCell(7);

  // tambah nilai ke dalam cell
  cell1.innerHTML = k.stats[8].value;
  cell2.innerHTML = `<img src='${k.team.logos[0].href}' width='30' height='30'>`;
  cell3.innerHTML = k.team.name;
  cell4.innerHTML = k.stats[0].value;
  cell5.innerHTML = k.stats[2].value;
  cell6.innerHTML = k.stats[1].value;
  cell7.innerHTML = k.stats[9].displayValue;
  cell8.innerHTML = k.stats[6].value;

}

resetButton.addEventListener('click', function () {
  location.reload();
})












