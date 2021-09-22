const input = document.getElementById("search-input-id");
var articleTitle = document.querySelectorAll(".article-title  h3"); // got the h3 array
var descriptionContent = document.querySelectorAll(".description-content"); // got the h4 array
var articleEach = document.querySelectorAll(".article-each"); // article container
var aboutSection = document.querySelector(".info");
var hr = document.querySelector(".hr");
var value;

function searchItem() {
  value = input.value.toLowerCase();

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
    } else {
      // item not found

      articleEach[i].style.display = "none";
    }
  }
}
