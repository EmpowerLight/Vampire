const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const comments = [];
const startingContent = "Do you want to know about Vampires?"

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("home", {
    content: startingContent
  });
});

app.post("/", function(req, res) {
  res.redirect("/vampire");
});

app.get("/vampire", function(req, res) {
  res.render("vampire");
});

app.get("/comment", function(req, res) {
  res.render("comment");
});

app.post("/comment", function(req, res) {
  const comment = {
    name: req.body.name,
    comment: req.body.comment
  }
  comments.push(comment);
  res.redirect("/thankYou");
});

app.get("/thankYou", function(req, res) {
  res.render("Thank-you");
});

app.get("/post", function(req, res) {
  res.render("commentpost", {
    posts: comments
  });
});

app.get("/vampire/:info", function(req, res) {
  const data = req.params.info;
  if (data === ":vladTheImpaler") {
    res.render("vlad");
  } else if (data === ":mercyBrown") {
    res.render("mercyBrown");
  } else {
    res.render("rodheIsland");
  }
});

app.listen(3000, function() {
  console.log("Server is running at port: 3000");
})
