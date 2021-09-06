import { themeOnLoad, adjustTheme } from "/js/functions.js";

const img = document.querySelector("#theme-img");
themeOnLoad();

if (img)
  img.addEventListener("click", () => {
    adjustTheme();
  });
