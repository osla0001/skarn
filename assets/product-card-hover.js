// Skifter billede på hover via JS i stedet for CSS

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".card-gallery a").forEach(function (card) {
    const main = card.querySelector(".product-media-container");
    const product = card.closest(".card-gallery");
    if (!main || !product) return;
    // Find produktets handle fra linket
    const href = card.getAttribute("href");
    const handleMatch = href && href.match(/\/products\/([a-zA-Z0-9\-_]+)/);
    if (!handleMatch) return;
    const handle = handleMatch[1];
    card.addEventListener("mouseenter", function () {
      if (card.dataset.hoverLoaded) return;
      fetch(`/products/${handle}.js`)
        .then((res) => res.json())
        .then((data) => {
          if (data.images && data.images.length > 1) {
            const img2 = document.createElement("img");
            img2.src = data.images[1];
            img2.alt = main.alt || "";
            img2.style.position = "absolute";
            img2.style.inset = 0;
            img2.style.width = "100%";
            img2.style.height = "100%";
            img2.style.objectFit = "cover";
            img2.style.zIndex = 2;
            img2.style.opacity = 0;
            img2.style.transition = "opacity 0.3s";
            main.parentNode.appendChild(img2);
            card.dataset.hoverLoaded = "1";
            card.addEventListener("mouseenter", function () {
              img2.style.opacity = 1;
            });
            card.addEventListener("mouseleave", function () {
              img2.style.opacity = 0;
            });
          }
        });
    });
  });
});
