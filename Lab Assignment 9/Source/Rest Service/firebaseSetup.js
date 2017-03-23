var firebase = require("firebase");

firebase.initializeApp({
    serviceAccount: "./Assignment-bc2124418e95.json",
    databaseURL: "https://assignment-a19eb.firebaseio.com"
});

var fbdb= firebase.database().ref('/messages');
module.exports.fbdb = fbdb;

console.log('Firebase Ready');
