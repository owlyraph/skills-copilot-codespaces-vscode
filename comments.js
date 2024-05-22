// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs
// npm install express-session
// npm install connect-flash
// npm install method-override
// npm install passport
// npm install passport-local
// npm install passport-local-mongoose
// npm install express-sanitizer
// npm install moment

// Require packages
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override");

// Connect to the database
mongoose.connect("mongodb://localhost/comments");

// Set up the app
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Seed the database
seedDB();

// Routes
app.get("/", function(req, res) {
    res.redirect("/comments");
});

// INDEX
app.get("/comments", function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {comments: comments});
        }
    });
});

// NEW
app.get("/comments/new", function(req, res) {
    res.render("new");
});

// CREATE
app.post("/comments", function(req, res) {
    Comment.create(req.body.comment, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/comments");
        }
    });
});

// SHOW
app.get("/comments/:id", function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {comment: comment});
        }
    });
});

// EDIT
app.get("/comments/:id/edit", function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.render("edit", {comment: comment});
        }
    });
});

// UPDATE
app.put("/comments/:id", function(req, res) {
    Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, comment) {
        if (