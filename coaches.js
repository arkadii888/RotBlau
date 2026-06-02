document.addEventListener("DOMContentLoaded", () => {
  const coachesNav = document.getElementById("coaches-nav");
  const coachesGrid = document.getElementById("coaches-grid");

  if (!coachesNav || !coachesGrid) return;

  fetch("data/coaches.json")
    .then((response) => response.json())
    .then((coachesData) => {
      if (coachesData.length === 0) return;

      coachesData.forEach((team, index) => {
        const pill = document.createElement("a");
        pill.href = "#";
        pill.textContent = team.name;

        if (index === 0) pill.classList.add("active");

        pill.addEventListener("click", (e) => {
          e.preventDefault();

          document
            .querySelectorAll("#coaches-nav a")
            .forEach((a) => a.classList.remove("active"));
          pill.classList.add("active");

          renderCoaches(team);
        });

        coachesNav.appendChild(pill);
      });

      renderCoaches(coachesData[0]);
    });

  function renderCoaches(team) {
    coachesGrid.innerHTML = "";

    if (team.message && team.coaches.length === 0) {
      coachesGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: #a0aec0; font-size: 18px; padding: 40px;">
                    ${team.message}
                </div>
            `;
      return;
    }

    team.coaches.forEach((coach) => {
      const card = document.createElement("article");
      card.className = "player-card";

      const defaultSilhouette =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
      const imageSrc = coach.image ? coach.image : defaultSilhouette;

      // Оставили только картинку и имя, убрали рамку снизу
      card.innerHTML = `
                <img src="${imageSrc}" class="player-image" alt="${coach.name}">
                <div class="player-name" style="border-bottom: none; padding: 20px 10px; flex-grow: 1;">${coach.name}</div>
            `;
      coachesGrid.appendChild(card);
    });
  }
});
