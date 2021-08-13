const users = [
  {
    email: "admin@admin.com",
    password: "admin",
  },
  {
    email: "test@test.com",
    password: "test",
  },
];

var articleList = [
  {
    id: 1,
    title: "what is meant by this keyword ? ",
    description: "this keyword refers to current class",
    content: "there are many uses of this keyword and it varies on languages",
    contentHtml:
      "there are many uses of this keyword and it varies on languages",
    date: "2021-08-13",
  },
  {
    id: 2,
    title: "deploying a server on gcp",
    description: "from begining to end on deploying a server on gcp",
    content: "first signup for gcp it is completely free for 3 months",
    contentHtml: "first signup for gcp it is completely free for 3 months",
    date: "2021-07-14",
  },
];

const SECRET_KEY = "mysercretkey@!";
var token = "";
var idCount = 2; // since 2 items are alredy there
var emtptyArticle = {
  id: "none",
  title: "",
  description: "",
  content: "",
  contentHtml: "",
};

module.exports = {
  articleList,
  users,
  token,
  SECRET_KEY,
  idCount,
  emtptyArticle,
};
