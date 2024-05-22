// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Routes
app.get('/comments', function(req, res) {
  fs.readFile(commentsPath, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(commentsPath, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});