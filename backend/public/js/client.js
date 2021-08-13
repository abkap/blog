import { themeOnLoad, adjustTheme } from "/js/functions.js";

const img = document.querySelector("#theme-img");
themeOnLoad();

img.addEventListener("click", () => {
  adjustTheme();
});
