document.addEventListener("DOMContentLoaded", function () {
  function insertWrapperInMegaMenu() {
    var megaMenu = document.querySelector("ul.tmenu_submenu_type_mega.tmenu_submenu--desktop.tmenu_submenu_mega_position_fullwidth.tmenu_submenu_has_watermark.tmenu_submenu");
    if (megaMenu && !megaMenu.querySelector(".sub-menu_wrapper")) {
      var wrapper = document.createElement("div");
      wrapper.className = "sub-menu_wrapper";
      megaMenu.insertBefore(wrapper, megaMenu.firstChild);
      // Flyt alle li-elementer ind i wrapper
      var liItems = Array.from(megaMenu.querySelectorAll(":scope > li"));
      liItems.forEach(function (li) {
        wrapper.appendChild(li);
      });
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
  style.innerHTML = "";
  document.head.appendChild(style);
});
