var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.) 
  fs.readFile(asset, function (err,data) {
   
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
    }
    res.writeHead(200);
    res.end(data);
  });
};
// As you progress, keep thinking about what helper functions you can put here!

/*
var filePath = req.url;
if (filePath == '/')
  filePath = '/index.html';

filePath = __dirname+filePath;
var extname = path.extname(filePath);
var contentType = 'text/html';

switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
}


fs.exists(filePath, function(exists) {

    if (exists) {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                res.writeHead(500);
                res.end();
            }
            else {                   
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');                  
            }
        });
    } */
