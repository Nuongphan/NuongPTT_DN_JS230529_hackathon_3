interface Player {
  name: string;
  point: number;
  ranking: string;
}

let players: Player[] = [
  { name: "Nương Nương", point: 7, ranking: "no-ranking" },
  { name: "Quỳnh Đan", point: 3, ranking: "no-ranking" },
  { name: "Cẩm Thanh", point: 0, ranking: "no-ranking" },
];

if (!localStorage.getItem("players")) {
  localStorage.setItem("players", JSON.stringify(players));
}
// Function Render Players
function renderPlayers(): void {
  let players: { name: string; point: number; ranking: string }[] = JSON.parse(
    localStorage.getItem("players") || "[]"
  );
  function sumPoint(): number {
    let sum = 0;
    for (let i = 0; i < players.length; i++) {
      sum += Number(players[i].point);
    }
    return sum;
  }
  let sum: number = sumPoint();
  let pointBoardElement = document.querySelector(".point-board") as HTMLElement;
  let pointBoardElementContent: string = `<table>
  <tr>
      <td>Players:</td>
      <td>${players.length}</td>
  </tr>
  <tr>
      <td>Total Points:</td>
      <td>${sum}</td>
  </tr>
</table>`;
  let mainElement = document.querySelector("main") as HTMLElement;
  let mainElementContent: string = "";
  if (players.length > 0) {
    for (let i = 0; i < players.length; i++) {
      mainElementContent += `<section class="player-info" id="player-${i}">
    <div class="group-icon">
        <i class="fa-solid fa-xmark " onclick="handleDelete(${i})"></i>
        <i class="fa-solid fa-trophy  ${players[i].ranking}" id="trophy"></i>
        <p class="player-name">${players[i].name}</p>
    </div>
    <div class="point-grade">
        <i class="fa-solid fa-minus pg icon-minus" onclick="handleMinus(${i})"></i>
        <span class="point pg">${players[i].point}</span>
        <i class="fa-solid fa-plus pg" onclick="handlePlus(${i})"></i>
    </div>
</section>`;
    }
    pointBoardElement.innerHTML = pointBoardElementContent;
    mainElement.innerHTML = mainElementContent;
  } else {
    mainElementContent = `<p class="notifi">No player found </p>`;
    mainElement.innerHTML = mainElementContent;
  }
}

renderPlayers();

// Function Add Players
function handleAdd(): void {
  let players: { name: string; point: number; ranking: string }[] = JSON.parse(
    localStorage.getItem("players") || "[]"
  );
  let inputElement = document.querySelector(
    ".input-player"
  ) as HTMLInputElement;

  let inputPlayerName = inputElement.value;
  if (inputPlayerName !== "") {
    let inputPlayer = {
      name: inputPlayerName,
      point: 0,
      ranking: "no-ranking",
    };
    players.push(inputPlayer);
    localStorage.setItem("players", JSON.stringify(players));
    inputElement.value = "";
    renderPlayers();
  }
}

// Function Plus & Minus
function handlePlus(i: number): void {
  let players: { name: string; point: number; ranking: string }[] = JSON.parse(
    localStorage.getItem("players") || "[]"
  );
  players[i].point++;

  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
}

function handleMinus(i: number): void {
  let players: { name: string; point: number; ranking: string }[] = JSON.parse(
    localStorage.getItem("players") || "[]"
  );
  players[i].point--;
  if (players[i].point < 0) {
    players[i].point = 0;
  }
  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
}

// Ranking
function updateRanking(): void {
  let players: { name: string; point: number; ranking: string }[] = JSON.parse(
    localStorage.getItem("players") || "[]"
  );
  let maxPoint: number = 0;
  // Find the maximum point

  for (let i = 0; i < players.length; i++) {
    if (players[i].point > maxPoint) {
      maxPoint = players[i].point;
    }
  }

  // Update ranking for players with the maximum point
  for (let i = 0; i < players.length; i++) {
    if (players[i].point === maxPoint) {
      players[i].ranking = "top-ranking";
    } else {
      players[i].ranking = "no-ranking";
    }
  }

  localStorage.setItem("players", JSON.stringify(players));
}
updateRanking();
function handleDelete(i: number): void {
  let players: { name: string; point: number; ranking: string }[] = JSON.parse(
    localStorage.getItem("players") || "[]"
  );
  players.splice(i, 1);
  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
}
