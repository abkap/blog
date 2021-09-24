import { themeOnLoad, adjustTheme } from "/js/functions.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    console.log("img is : " + img);

    img.style.display = "block";
  });
});

const slider = document.querySelector(".slider");
themeOnLoad();

if (slider)
  slider.addEventListener("click", () => {
    adjustTheme();
  });
