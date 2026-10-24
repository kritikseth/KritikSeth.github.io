// Slide-out menu and page-load behaviour (replaces the template's jQuery/skel scripts).
(function () {
  var body = document.body;
  var menu = document.getElementById("menu");

  // Disable animations/transitions until the page has loaded.
  body.classList.add("is-loading");
  window.addEventListener("load", function () {
    setTimeout(function () { body.classList.remove("is-loading"); }, 100);
  });

  if (!menu) return;

  var toggles = document.querySelectorAll('#header a[href="#menu"]');

  function setOpen(open) {
    menu.classList.toggle("visible", open);
    for (var i = 0; i < toggles.length; i++) toggles[i].setAttribute("aria-expanded", open);
    if (!open) setTimeout(function () { menu.scrollTop = 0; }, 500);
  }

  function isOpen() {
    return menu.classList.contains("visible");
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a");

    if (link && link.getAttribute("href") === "#menu") {
      event.preventDefault();
      setOpen(!isOpen());
      return;
    }

    // Close on any click outside the menu, or on a link inside it.
    if (isOpen() && (!menu.contains(event.target) || (link && link.hasAttribute("href")))) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) setOpen(false);
  });

  // Swipe right to close.
  var startX = null, startY = null;
  menu.addEventListener("touchstart", function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
  }, { passive: true });
  menu.addEventListener("touchend", function (event) {
    if (startX === null) return;
    var dx = event.changedTouches[0].pageX - startX;
    var dy = event.changedTouches[0].pageY - startY;
    if (dx > 50 && Math.abs(dy) < 20) setOpen(false);
    startX = null;
  });
})();
