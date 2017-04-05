/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://root:root@ds139480.mlab.com:39480/samplease';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
   res.write("<h1>CRUD Web service please use /register, /update, /delete path params for insert , update , delete operations respectively</h1>");
   res.end();
});

app.post('/users', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write(JSON.stringify({success:false}));
            res.end();
        }
        getUsers(db, req.body, function(data) {
            console.log(data)
            res.write(JSON.stringify(data));
            res.end();
        });
    });
});

app.post('/login', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write(JSON.stringify({success:false}));
            res.end();
        }
        login(db, req.body, function() {
            res.write(JSON.stringify({success:true}));
            res.end();
        });
    });
});

app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});


app.post('/update', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        updateDocument(db, req.body, function() {
            res.write("Successfully updated");
            res.end();
        });
    });
});


app.post('/delete', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        deleteDocument(db, req.body, function() {
            res.write("Successfully deleted");
            res.end();
        });
    });
});

var login = function(db,data,callback){
    var cursor = db.collection('demoase').find({'email':data.email, 'password':data.password});

    flag = false;
    cursor.each(function(err,doc){
        assert.equal(err,null);
        if(doc != null)
        {
            if(flag == false){
                console.log('successfully logged in');
                flag = true;
            }

        } else {
            if(flag == false){
                console.log('invalid user name and password');
                flag = true;
            }
        }
    });

    callback();
};

var insertDocument = function(db, data, callback) {
    db.collection('demoase').insertOne( data );
    callback();
};

var updateDocument = function(db,data,callback){
    db.collection('demoase').updateMany({'email':data.email},{$set:{"fname":data.fname, 'lname':data.lname, 'password':data.password}});
    callback();
};


var deleteDocument = function(db,data,callback){
    db.collection('demoase').deleteMany({'email':data.email});
    callback();
};

var getUsers = function(db,data,callback){
    var cursor = db.collection('demoase').find();
    var arrList = [];
    cursor.each(function(err,doc){
        if(doc != null)
        {
            arrList.push({fname:doc.fname,lname:doc.lname,email:doc.email});
        }
    });
    id = setInterval(function(){
        if(arrList === []){

        } else {

            callback(arrList);
            clearInterval(id);
            console.log('bilal');
        }
    },500);
}

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server running at http://%s:%s", host, port)
})