const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/commentDB", {useNewUrlParser: true, useUnifiedTopology: true});

const commentSchema = {
  name: String,
  content: String
}

const Comment = mongoose.model("Comment", commentSchema);


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
  const comment = new Comment({
    name: req.body.Pname,
    content: req.body.Pcomment
  });
  comment.save(function(err){
    if(!err){
    res.redirect("/thankYou");
    }
  })
});

app.get("/thankYou", function(req, res) {
  res.render("Thank-you");
});

app.get("/post", function(req, res) {
  Comment.find({}, function(err, foundCmt){
    if(!err){
      res.render("commentpost", {posts: foundCmt});
    }
  });
});

app.get("/vampire/:info", function(req, res) {
  const data = req.params.info;
  if (data === "vladTheImpaler") {
    res.render("vlad");
  } else if (data === "mercyBrown") {
    res.render("mercyBrown");
  } else {
    res.render("rodheIsland");
  }
});

app.listen(3000, function() {
  console.log("Server is running at port: 3000");
})
