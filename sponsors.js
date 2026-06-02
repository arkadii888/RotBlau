document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("sponsors-grid");

  if (!grid) return;

  fetch("data/sponsors.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((sponsor) => {
        const card = document.createElement("a");
        card.className = "sponsor-card";
        card.href = sponsor.link || "#";
        card.target = "_blank";

        const defaultLogo =
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cbd5e1'%3E%3Cpath d='M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4V5h16v14zm-9-2l-3-4-3 4h12l-3-5z'/%3E%3C/svg%3E";
        const imgSrc = sponsor.logo ? sponsor.logo : defaultLogo;

        card.innerHTML = `<img src="${imgSrc}" alt="${sponsor.name}" class="sponsor-logo">`;

        grid.appendChild(card);
      });
    });
});
