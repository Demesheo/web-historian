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
    if(pathName !== '/index.html'){
      httpHelp.serveAssets(res, archive.paths.archivedSites + pathName);
    } else {
      httpHelp.serveAssets(res, archive.paths.home + pathName);
    }
  };

  if(req.method === 'POST'){
    var data = '';
    req.on('data', function(chunk){
      res.writeHead(302);
      data += chunk;
    });

    req.on('end', function(){
    
      data = JSON.parse(data);
      console.log(data);
      console.log('filepath: ', archive.paths.list);

      fs.appendFile(archive.paths.list, JSON.stringify(data['url']), function (err) {

        if (err) throw err;
        console.log('The website name was appended to file!');})
        res.end(); // TODO: This is hella broken.
    });

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
