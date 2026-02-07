document.addEventListener("DOMContentLoaded", function () {
  function insertWrapperInMegaMenu() {
    var megaMenu = document.querySelector("ul.tmenu_submenu_type_mega.tmenu_submenu--desktop.tmenu_submenu_mega_position_fullwidth.tmenu_submenu_has_watermark.tmenu_submenu");
    if (megaMenu && !megaMenu.querySelector(".sub-menu_wrapper")) {
      var wrapper = document.createElement("div");
      wrapper.className = "sub-menu_wrapper";
      megaMenu.insertBefore(wrapper, megaMenu.firstChild);
    }
  }

  // Initial run
  insertWrapperInMegaMenu();

  // Observe for dynamic menu
  var observer = new MutationObserver(function () {
    insertWrapperInMegaMenu();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Inject CSS for wrapper
  var style = document.createElement("style");
  style.innerHTML = ".tmenu_submenu_type_mega .sub-menu_wrapper { width: 100vw !important; max-width: 100vw !important; position: relative; left: 50%; transform: translateX(-50%); }";
  document.head.appendChild(style);
});
