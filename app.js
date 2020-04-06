var express = require('express');
var path = require('path');
var chalk = require('chalk');

var port = process.env.PORT || 8000;
var app = express();

app.use(express.static('source')); // NOTE: serving out of source for now

app.get('/', function(req, res){
  res.sendFile('index.html', {root: path.resolve(__dirname, 'source')});
});

app.listen(port, function(err){
  console.log(chalk.blue('Server created on port: ') + chalk.red(port));
});

