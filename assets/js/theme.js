// The initial theme is applied by an inline script in the <head> (see _includes/head.html).
(function () {
  var root = document.documentElement;
  var toggleButton = document.getElementById("toggle-theme");

  function hasSavedTheme() {
    try { return !!localStorage.getItem("theme"); } catch (e) { return false; }
  }

  function setTheme(theme, save) {
    root.setAttribute("data-theme", theme);
    if (save) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light", true);
    });
  }

  // Follow the system theme only while the visitor hasn't picked one themselves.
  if (window.matchMedia) {
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (event) {
      if (!hasSavedTheme()) setTheme(event.matches ? "dark" : "light", false);
    };
    if (media.addEventListener) media.addEventListener("change", onChange);
    else if (media.addListener) media.addListener(onChange);
  }
})();
