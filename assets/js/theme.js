const toggleButton = document.getElementById("toggle-theme");
const themeLink = document.getElementById("theme");
const savedTheme = localStorage.getItem("theme");

// Set the initial theme based on saved preference, or use system theme by default
if (savedTheme) {
  themeLink.href = savedTheme;
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  themeLink.href = "assets/css/main-dark.css";
} else {
  themeLink.href = "assets/css/main-light.css";
}

toggleButton.addEventListener("click", function() {
  if (themeLink.href.endsWith("assets/css/main-light.css")) {
    themeLink.href = "assets/css/main-dark.css";
    localStorage.setItem("theme", "assets/css/main-dark.css");
  } else {
    themeLink.href = "assets/css/main-light.css";
    localStorage.setItem("theme", "assets/css/main-light.css");
  }
});

// Update theme when system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  const newColorScheme = event.matches ? "assets/css/main-dark.css" : "assets/css/main-light.css";
  themeLink.href = newColorScheme;
  localStorage.setItem("theme", newColorScheme);
});
