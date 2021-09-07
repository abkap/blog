import { themeOnLoad, adjustTheme } from "/js/functions.js";

// displaying icon

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    console.log("img is : " + img);

    img.style.display = "block";
  });
});

const image = document.querySelector("#theme-img");
themeOnLoad();

if (image)
  image.addEventListener("click", () => {
    adjustTheme();
  });
