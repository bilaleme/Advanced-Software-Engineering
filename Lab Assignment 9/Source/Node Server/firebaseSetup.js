// Initialize Firebase

var config = {
    apiKey: "AIzaSyDdJQbVVTpBTP9tjvaxhUXKf3YB6QaMk6M",
    authDomain: "assignment-a19eb.firebaseapp.com",
    databaseURL: "https://assignment-a19eb.firebaseio.com",
    storageBucket: "assignment-a19eb.appspot.com",
    messagingSenderId: "181847725105"
};

firebase.initializeApp(config);

var fbdb = firebase.database().ref('/messages');

// var fbdb= app.ref('/messages');
//
// console.log('Firebase Ready');
