// Tilføjer blur til .header når .tmenu_item_active findes på siden (kun på forsiden)
if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
  function updateHeaderBg() {
    const header = document.querySelector(".header");
    if (!header) return;
    if (document.querySelector(".tmenu_item_active")) {
      header.style.background = "#fff";
    } else {
      header.style.background = "";
    }
  }
  updateHeaderBg();
  const observer = new MutationObserver(updateHeaderBg);
  observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
}
