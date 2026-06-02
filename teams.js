document.addEventListener("DOMContentLoaded", () => {
  const teamsNav = document.getElementById("teams-nav");
  const playersGrid = document.getElementById("players-grid");

  if (!teamsNav || !playersGrid) return;

  fetch("data/teams.json")
    .then((response) => response.json())
    .then((teamsData) => {
      if (teamsData.length === 0) return;

      teamsData.forEach((team, index) => {
        const pill = document.createElement("a");
        pill.href = "#";
        pill.textContent = team.name;

        if (index === 0) pill.classList.add("active");

        pill.addEventListener("click", (e) => {
          e.preventDefault();

          document
            .querySelectorAll("#teams-nav a")
            .forEach((a) => a.classList.remove("active"));
          pill.classList.add("active");

          renderPlayers(team.players);
        });

        teamsNav.appendChild(pill);
      });

      renderPlayers(teamsData[0].players);
    });

  function renderPlayers(players) {
    playersGrid.innerHTML = "";

    players.forEach((player) => {
      const card = document.createElement("article");
      card.className = "player-card";

      const defaultSilhouette =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
      const imageSrc = player.image ? player.image : defaultSilhouette;

      card.innerHTML = `
                <img src="${imageSrc}" class="player-image" alt="${player.name}">
                <div class="player-name">${player.name}</div>
                <div class="player-info">
                    <span>${player.number}</span>
                </div>
            `;
      playersGrid.appendChild(card);
    });
  }
});
