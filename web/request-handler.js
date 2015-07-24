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
    if(pathName !== '/index.html'){
      httpHelp.serveAssets(res, archive.paths.archivedSites + pathName);
    } else {
      httpHelp.serveAssets(res, archive.paths.home + pathName);
    }
  };

  if(req.method === 'POST'){
    var data = '';
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      console.log('data end');
      data = JSON.parse(data);
      fs.appendFile(archive.paths.list, data['url'] + '\n', function (err) {
        if (err) throw err;
        
        res.writeHead(302, httpHelp.headers);
        res.end(); // This hella works
      })
    });

  };
};