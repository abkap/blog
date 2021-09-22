const input = document.getElementById("search-input-id");
var articleTitle = document.querySelectorAll(".article-title  h3"); // got the h3 array
var descriptionContent = document.querySelectorAll(".description-content"); // got the h4 array
var articleEach = document.querySelectorAll(".article-each"); // article container
var aboutSection = document.querySelector(".info");
var hr = document.querySelector(".hr");
var value;
var isArticlesEmtpy;

const articles = document.querySelector(".articles");
const div = document.createElement("div");
const h3 = document.createElement("h3");
div.classList.add("article-each");
div.classList.add("emtpy-articles");
h3.classList.add("article-title");
h3.textContent = "No Similar Posts Found !";
div.appendChild(h3);
articles.appendChild(div);
div.style.display = "none";

function searchItem() {
  value = input.value.toLowerCase();
  isArticlesEmtpy = true;
  div.style.display = "none";

  if (value.length > 0) {
    aboutSection.style.display = "none";
    hr.style.display = "none";
  } else {
    aboutSection.style.display = "flex";
    hr.style.display = "block";
  }
  for (let i = 0; i < articleTitle.length; i++) {
    // same length for description

    if (
      articleTitle[i].textContent.toLowerCase().indexOf(value) > -1 ||
      descriptionContent[i].textContent.toLowerCase().indexOf(value) > -1
    ) {
      // found the item
      articleEach[i].style.display = "";
      isArticlesEmtpy = false;
    } else {
      // item not found

      articleEach[i].style.display = "none";
    }
  }

  if (isArticlesEmtpy) {
    // show emty tag
    div.style.display = "";
    console.log("article is empty");
  }
  // console.log("executed serach");
}
