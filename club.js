document.addEventListener("DOMContentLoaded", () => {
  const clubNav = document.getElementById("club-nav");
  const clubContent = document.getElementById("club-content");

  if (!clubNav || !clubContent) return;

  fetch("data/club.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) return;

      data.forEach((tab, index) => {
        const pill = document.createElement("a");
        pill.href = "#";
        pill.textContent = tab.name;

        if (index === 0) pill.classList.add("active");

        pill.addEventListener("click", (e) => {
          e.preventDefault();

          document
            .querySelectorAll("#club-nav a")
            .forEach((a) => a.classList.remove("active"));
          pill.classList.add("active");

          renderContent(tab);
        });

        clubNav.appendChild(pill);
      });

      renderContent(data[0]);
    });

  function renderContent(tab) {
    const parsedContent = marked.parse(tab.content);

    clubContent.innerHTML = `
            <article class="club-card">
                <div class="markdown-body">
                    ${parsedContent}
                </div>
            </article>
        `;
  }
});
