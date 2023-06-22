const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const url =
  "mongodb+srv://Dooo:PhuwhUpA1dPg9AVL@cluster0.hha6mae.mongodb.net";
mongoose.connect(url + "/PostsDB", { useNewUrlParser: true });

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = new mongoose.model("Post", postSchema);

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  const query = Post.find();
  query
    .then((posts) => {
      res.render("Home.ejs", { posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/post", function (req, res) {
  res.render("Post.ejs");
});

app.post("/post", function (req, res) {
  const lod = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  lod.save();

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server starts!!");
});
