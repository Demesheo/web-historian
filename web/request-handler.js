"use strict";

var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpRequest = require('http-request');
var fs = require('fs');
var httpHelp = require('./http-helpers');
var url = require('url');


exports.handleRequest = function (req, res) {
  if(req.method === 'GET'){
    var pathName = req.url;
    if(pathName === '/'){
      pathName = '/index.html';
    }
    console.log('archive search path :', archive.paths.archivedSites + pathName);
    // req.on('finish', function(){ 
      if(pathName !== '/index.html'){
        httpHelp.serveAssets(res, archive.paths.archivedSites + pathName);
      } else {
        httpHelp.serveAssets(res, archive.paths.home + pathName);
      }
    // }); 
  };
};
//





  // fs.readFile(archive.paths.home, function (err,data) {
  //   if (err) {
  //     res.writeHead(404);
  //     res.end(JSON.stringify(err));
  //     return;
  //   }
  //   res.writeHead(200);
  //   res.end(data);
  // });


var end = function(data, statusCode){
  res.writeHead(statusCode);
  res.end(data);
};
