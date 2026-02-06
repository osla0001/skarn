// Tilføjer blur til .header når .tmenu_item_active findes på siden (kun på forsiden)
if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
  function updateHeaderBlur() {
    const header = document.querySelector(".header");
    if (!header) return;
    if (document.querySelector(".tmenu_item_active")) {
      header.style.backdropFilter = "blur(5px)";
    } else {
      header.style.backdropFilter = "";
    }
  }
  updateHeaderBlur();
  const observer = new MutationObserver(updateHeaderBlur);
  observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
}
