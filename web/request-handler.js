var path = require('path');
var archive = require('../helpers/archive-helpers');
// var home = require('./public/index');
var httpRequest = require('http-request');
var fs = require('fs');
// require more modules/folders here

exports.handleRequest = function (req, res) {
    // console.log(home)

  fs.readFile(archive.paths.home, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });

};
