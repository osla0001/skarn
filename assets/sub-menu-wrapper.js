document.addEventListener("DOMContentLoaded", function () {
  function wrapMegaMenu() {
    var megaMenu = document.querySelector("ul.tmenu_submenu_type_mega.tmenu_submenu--desktop.tmenu_submenu_mega_position_fullwidth.tmenu_submenu_has_watermark.tmenu_submenu");
    if (megaMenu && !megaMenu.parentElement.classList.contains("sub-menu_wrapper")) {
      var wrapper = document.createElement("div");
      wrapper.className = "sub-menu_wrapper";
      megaMenu.parentNode.insertBefore(wrapper, megaMenu);
      wrapper.appendChild(megaMenu);
    }
  }

  // Initial run
  wrapMegaMenu();

  // Observe for dynamic menu
  var observer = new MutationObserver(function () {
    wrapMegaMenu();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Inject CSS for wrapper and submenu
  var style = document.createElement("style");
  style.innerHTML = ".sub-menu_wrapper { width: 100vw !important; max-width: 100vw !important; position: relative; left: 50%; transform: translateX(-50%); } .sub-menu_wrapper .tmenu_submenu { max-width: 1280px !important; margin-left: auto !important; margin-right: auto !important; }";
  document.head.appendChild(style);
});
