

var fbRef = require('./firebaseSetup.js');
var express = require('express');
var app = express();
// var request = require('request');
var http = require('http');
var https = require('https');
app.get('/pushMessage', function(req, res) {

    https.get('https://api.uclassify.com/v1/uClassify/Sentiment/classify?readKey=jQ6SEmI3Kgrl&text='+req.query.text,function(myResp){

        myResp.on('data',function(chunk){

            jsonChunk = JSON.parse(chunk);
            myResp = jsonChunk;
            console.log(jsonChunk);
            fbRef.fbdb.push({
                message: req.query.text,
                positive: jsonChunk.positive,
                negative: jsonChunk.negative
            });
            res.write(JSON.stringify({
                message: 'OK',
            }));
        });

        myResp.on('end',function(){
           console.log('response ended');
            res.end();
        });

    });
});

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});