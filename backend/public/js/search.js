const input = document.getElementById("search-input-id");
var articleTitle = document.querySelectorAll(".article-title  h3"); // got the h3 array
var descriptionContent = document.querySelectorAll(".description-content"); // got the h4 array
var articleEach = document.querySelectorAll(".article-each"); // article container
var value;

function searchItem() {
  value = input.value.toLowerCase();
  console.log(value);
  for (let i = 0; i < articleTitle.length; i++) {
    // same length for description

    if (
      articleTitle[i].textContent.indexOf(value) > -1 ||
      descriptionContent[i].textContent.indexOf(value) > -1
    ) {
      // found the item
      articleEach[i].style.display = "";
    } else {
      // item not found

      articleEach[i].style.display = "none";
    }
  }
}
