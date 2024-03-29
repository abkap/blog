const root = document.querySelector(":root");

const slider = document.querySelector(".slider");
const sliderRound = document.querySelector(".slider-round");

// used inside this func only
function setCookie(name, value) {
  let date = new Date();
  date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * 365); // days

  document.cookie = `${name}=${value};path=/;expires=${date.toGMTString()};`;
}

function checkCookie(name) {
  var cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    let splitCookie = cookies[i].split("=");
    if (name == splitCookie[0]) return splitCookie[1];
  }
  return null;
}

function setDarkThemeProperty() {
  // set properties for dark theme
  if (slider && sliderRound) {
    slider.classList.add("slider-active");
    sliderRound.classList.add("slider-round-active");
  }

  root.style.setProperty("--bg-color", "#1e1f33");
  root.style.setProperty("--font-color", "#adafd0");
  root.style.setProperty("--container-color", "#262742");
  root.style.setProperty("--button-color-readmore", "#e84172");
  root.style.setProperty("--button-color-delete", "#f64a4a");
  root.style.setProperty("--button-color-edit", "#4184e8");
  root.style.setProperty("--button-color-create", "#52cf8c");
  root.style.setProperty("--search-input", "#262742");
  root.style.setProperty("--font-color2", "#8587a4");
  root.style.setProperty("--button-color-logout", "#f64a4a");
  root.style.setProperty("--border-color", "#adafd0");
  root.style.setProperty("--code-bg", "#313250");
  root.style.setProperty("--anchor-color", " #adafd0");
  //   new
  root.style.setProperty("--placeholder-color", " #9494a0");
  root.style.setProperty("--description-color", "#5c5d80");
  root.style.setProperty("--code-color", "#d1d2e2");
}

function setLightThemeProperty() {
  if (slider && sliderRound) {
    slider.classList.remove("slider-active");
    sliderRound.classList.remove("slider-round-active");
  }

  root.style.setProperty("--bg-color", "#EFEFEF");
  root.style.setProperty("--font-color", "#676874");
  root.style.setProperty("--container-color", "#E8E8E8");
  //   root.style.setProperty("--container-color", "transparent");
  root.style.setProperty("--button-color-readmore", "#7D90F1");
  root.style.setProperty("--button-color-delete", "#F64A4A");
  root.style.setProperty("--button-color-edit", "#E84172");
  root.style.setProperty("--button-color-create", "#52cf8c");
  root.style.setProperty("--search-input", "#E5E5E5");
  root.style.setProperty("--font-color2", "#5e5e70");
  root.style.setProperty("--button-color-logout", "#f64a4a");
  root.style.setProperty("--border-color", "#676874");
  root.style.setProperty("--code-bg", "#d7d7d7");
  root.style.setProperty("--anchor-color", " #7274AF");
  //  new
  root.style.setProperty("--placeholder-color", " #9494a0");
  root.style.setProperty("--description-color", "#9494a0");
  root.style.setProperty("--code-color", "#292960");
}

// end

// func used in other files
function adjustTheme() {
  if (checkCookie("theme") == "dark") {
    // make it light theme
    setCookie("theme", "light");
    //    load light theme property
    setLightThemeProperty();
  } else if (checkCookie("theme") == "light") {
    // make it dark theme
    setCookie("theme", "dark");
    //  load dark theme property
    setDarkThemeProperty();
  }
}

function themeOnLoad() {
  if (checkCookie("theme") == "dark") {
    // load dark theme
    setDarkThemeProperty();
  } else if (checkCookie("theme") == "light") {
    // load light theme
    setLightThemeProperty();
  } else {
    // doesnt exists
    //   initial is always light
    setCookie("theme", "light");
    setLightThemeProperty();
  }
}
export { themeOnLoad, adjustTheme };
