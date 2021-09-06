import { themeOnLoad, adjustTheme } from "/js/functions.js";
// displaying icon
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((item) => {
    console.log("item is : " + item);

    item.style.display = "initial";
  });
});

const img = document.querySelector("#theme-img");
themeOnLoad();

if (img)
  img.addEventListener("click", () => {
    adjustTheme();
  });
