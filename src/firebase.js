import React from 'react';
var firebase = require('firebase');
var firebaseui = require('firebaseui');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPUxXrRR6ZdlRK1GHIrboFFWVu3VVOUwA",
  authDomain: "keen-boulder-286521.firebaseapp.com",
  databaseURL: "https://keen-boulder-286521.firebaseio.com",
  projectId: "keen-boulder-286521",
  storageBucket: "keen-boulder-286521.appspot.com",
  messagingSenderId: "745284270797",
  appId: "1:745284270797:web:fefc690c0470a662550784",
  measurementId: "G-ZVCN44M5GN"
};

// Initialize Firebase
const FirebaseFile = firebase.initializeApp(firebaseConfig);

export default FirebaseFile;