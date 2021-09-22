const body = document.querySelector("body");
console.log("grabbed", body);
body.style.display = "none";

window.addEventListener("load", () => {
  body.style.display = "initial";
  console.log("body reloaded");
});
