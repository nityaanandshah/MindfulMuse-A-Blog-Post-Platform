//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to the blog page of Nitya, a third-year CSE @IITJ student! Here, you'll find a collection of captivating articles covering academics, campus life, and personal experiences. Explore the separate pages for each blog post, offering valuable insights and practical tips. Join us on this transformative journey through IITJ and beyond, one blog post at a time.";
const aboutContent = "Here, you'll discover a diverse range of articles that delve into the fascinating aspects of academics, campus life, and personal experiences. Each blog post offers valuable insights, practical tips, and inspiring stories from a third-year student's perspective. Join us as we navigate through the exciting journey of an IITJian, exploring the challenges, triumphs, and lessons learned along the way. Get ready to be inspired and informed as you dive into the captivating content of this blog page.";
const contactContent = "We would love to hear from you! If you have any questions, comments, or suggestions regarding the blog posts or the website, please feel free to reach out to us. Your feedback is highly valuable to us as we strive to provide engaging and informative content. You can contact us by sending an email to shah.10@iitj.ac.in. We will make sure to respond to your message as soon as possible. Thank you for your support and interest in our blog page. We look forward to connecting with you and continuing this journey together!";

let port = 3000;
let posts = [];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {
    hContent: homeStartingContent,
    posts: posts
  });
})

app.get("/about", function(req, res){
  res.render("about", {
    aContent: aboutContent
  });
})

app.get("/contact", function(req, res){
  res.render("contact", {
    cContent: contactContent
  });
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req, res){
  let item = req.body.postTitle;
  let body = req.body.postBody;
  const post = {
    title: item,
    content: body
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  var requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if(storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.listen(port, function(){
  console.log("Server listening at port: " + port);
})












