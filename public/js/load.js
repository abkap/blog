const html = document.querySelector("html");
console.log("html grabbed");
html.style.display = "none";

window.addEventListener("load", () => {
  html.style.display = "initial";
  console.log("html reloaded");
});
