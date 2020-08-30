import React, {useState} from 'react';
import './App.css';
import Upload from './components/upload'
var firebase = require('firebase');
var firebaseui = require('firebaseui');

function App() {
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
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  ////// Initialize the FirebaseUI Widget using Firebase. //////
  // var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // var uiConfig = {
  //   callbacks: {
  //     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
  //       // User successfully signed in.
  //       // Return type determines whether we continue the redirect automatically
  //       // or whether we leave that to developer to handle.
  //       console.log(authResult)
  //       // console.log(authResult.credential.idToken)
  //       console.log(authResult.additionalUserInfo.profile.id)
  //       return true;
  //     },
  //     uiShown: function() {
  //       // The widget is rendered.
  //       // Hide the loader.
  //       document.getElementById('loader').style.display = 'none';
  //     }
  //   },
  //   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  //   signInFlow: 'popup',
  //   signInSuccessUrl: '#',  //'<url-to-redirect-to-on-success>'
  //   signInOptions: [
  //     // Leave the lines as is for the providers you want to offer your users.
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID
  //   ],
  //   // tosUrl: '<your-tos-url>',  // Terms of service url.
  //   // privacyPolicyUrl: '<your-privacy-policy-url>'
  // };

  // // The start method will wait until the DOM is loaded.
  // ui.start('#firebaseui-auth-container', uiConfig);
  ////// Initialize the FirebaseUI Widget using Firebase. //////

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log(token);
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    console.log(user.l);
    console.log(result.additionalUserInfo.profile)
    console.log(result.additionalUserInfo.profile.id)
    // do something else
    // store the uID in state?
    // call a cloud function to save new user document
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  
  return (
    <div className="App">

      <h1>Eat a Rainbow!</h1>
      {/* <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div> */}

      {/* <div> {provider} </div> */}

      <Upload />
    </div>
  );
}

export default App;