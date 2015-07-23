var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

 exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  home: path.join(__dirname, '../web/public'),
  css: path.join(__dirname, '../web/public/styles.css')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
});
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
    var readData = [];
    fs.readFile(exports.paths.list, function (err, data){
        readData = data.toString('utf-8').split('\n');
        if(err){throw err};
        callback(readData);
    });
};

exports.isUrlInList = function(url, callback){

    exports.readListOfUrls(function(urls){
        if(urls.indexOf(url)!== -1){
            console.log('list includes :', url);
            callback(true);
        } else {callback(false)};
    });


};

exports.addUrlToList = function(url, callback){
    fs.appendFile(exports.paths.list, url.toString() + '\n', function (err) {
        if (err) throw err;
        callback();
    })

};

exports.isUrlArchived = function(url, callback){
    url = exports.paths.archivedSites + url;
    fs.readFile(url, function (err,data) {
        if (err) {
          callback(false)
      } else {
        callback(true)
    }
});
};

exports.downloadUrls = function(urlArray){
    for(var i = 0; i < urlArray.length; i++){
        var options = {url: urlArray[i] };
        var fileDestination = exports.paths.archivedSites + '/' +urlArray[i];
        httpRequest.get(options, fileDestination, function (error, result) {
            if (error) {
                console.error(error);
            } else {
                console.log('File downloaded at: ' + result.file);
            }
        })};
    };
