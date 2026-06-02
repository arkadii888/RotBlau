document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("news-grid");

  if (!grid) return;

  fetch("data/news.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("article");
        card.className = "news-card";

        let imagesHTML = "";
        let controlsHTML = "";
        let arrowsHTML = "";

        if (item.images && item.images.length > 0) {
          item.images.forEach((img, i) => {
            const isActive = i === 0 ? "active" : "";
            imagesHTML += `<img src="${img}" class="slider-image ${isActive}" alt="News image">`;

            if (item.images.length > 1) {
              controlsHTML += `<button class="slider-dot ${isActive}" data-index="${i}"></button>`;
            }
          });

          if (item.images.length > 1) {
            arrowsHTML = `
                            <button class="slider-arrow prev">&#10094;</button>
                            <button class="slider-arrow next">&#10095;</button>
                        `;
          }
        } else {
          imagesHTML = `<div class="card-image placeholder-img"></div>`;
        }

        const sliderHTML = `
                    <div class="slider-container">
                        ${imagesHTML}
                        ${arrowsHTML}
                        ${controlsHTML ? `<div class="slider-controls">${controlsHTML}</div>` : ""}
                    </div>
                `;

        const parsedContent = marked.parse(item.content);

        card.innerHTML = `
                    ${sliderHTML}
                    <div class="card-content">
                        <h2>${item.title}</h2>
                        <div class="markdown-body">${parsedContent}</div>
                    </div>
                `;

        grid.appendChild(card);

        if (item.images && item.images.length > 1) {
          const dots = card.querySelectorAll(".slider-dot");
          const imgs = card.querySelectorAll(".slider-image");
          const prevBtn = card.querySelector(".slider-arrow.prev");
          const nextBtn = card.querySelector(".slider-arrow.next");

          let currentIndex = 0;
          let slideInterval;

          const showSlide = (index) => {
            dots.forEach((d) => d.classList.remove("active"));
            imgs.forEach((img) => img.classList.remove("active"));

            currentIndex = index;
            if (currentIndex < 0) currentIndex = imgs.length - 1;
            if (currentIndex >= imgs.length) currentIndex = 0;

            dots[currentIndex].classList.add("active");
            imgs[currentIndex].classList.add("active");
          };

          const nextSlide = () => showSlide(currentIndex + 1);
          const prevSlide = () => showSlide(currentIndex - 1);

          const startTimer = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000);
          };

          dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
              showSlide(index);
              startTimer();
            });
          });

          prevBtn.addEventListener("click", () => {
            prevSlide();
            startTimer();
          });

          nextBtn.addEventListener("click", () => {
            nextSlide();
            startTimer();
          });

          startTimer();
        }
      });
    });
});
