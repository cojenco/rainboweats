import React, {useState} from 'react';
import './App.css';
import Upload from './components/upload'
import Upload2 from './components/upload2'
import Summary from './components/summary'
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

  // Initialize Firebase and avoid duplicates
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  // uID state to store uID
  const [uID, setuID] = useState('')
  const [username, setUsername] = useState('')

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
    setuID(result.additionalUserInfo.profile.id)
    setUsername(result.additionalUserInfo.profile.given_name)
    // do something else
    // call a cloud function to save new user document
    // use uID stored in state to upload image
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });

  
  return (
    <div className="App">
      <img 
        src="https://lh3.googleusercontent.com/_zHMRHWni-KlGvwhnQJKKF_bR5vKLxWUAmH3Qk5IzGkRdVlal0aMDOLpDg5arASfaAEJGCVUHuNNLRCUeoTdnISHj9IoC1e2W0cFm0W74dmqAA4GKVL_9jwvYTedOCJAoGqMnxADAPJ_kfNTciyuKFf9nvy5geY3LS9HWzdBAnyX2AhSrwZDzCcMeTH9ya1Q1wSnR70gMbqeAI5xk5fJS_xiuwN-X4qxrNgyLLf2kDcVrA7XvU_00BpqzyelpmG8S6BGjzaajLmFaxhU86cvFCgHR2g7Kl2yD3e42jklTJrtJ1LC_tsPQI1gde19vthKP6AXWJP1Ui8STYLHozfFe9DENyP64UGcj7IaZDbSrFGZM0WfvVrQtbQf-RMH35kLDlHkkoOW5JNGeEypW-MNv4HBl4WwwuI3h8gKNSKHGdsSHyxB4eelWPTAEcfAOtszWeO1z4QqCDYAzqFRyksInPGaa5cM32517ljM4C3Pj-Wa5e4KdGIFxbIZycjTCoTZAjnkcyGEV4z0JLocn_iTZY_RqnAIkyoA4UvVqQdV6Me_WduB9ki1b3mkd5dwnQGinX8hy7ZQZNIM7jjwn315aziRRjYrp7fGvhq62Y4FfET0dc1sq6y3-2m2FZ-JTwtjlynwiJPVmzRlVfMJsl4IU4GfAu43OW2gfz_LpbseYQ-4BvGQ8CsORyPOqOuB0w=w780-h521-no?authuser=0" 
        alt="a rainbow of veggies and fruit authorized by Happy Healthy Couple"
        className="w-50">
      </img>
      <h1>Eat a Rainbow</h1>
      <p>Hi {username}! </p>
      {/* <p>uID is {uID} </p> */}
      <h3> Add color! Upload an image of your meal </h3>
      <Upload2 uID={uID} />

      <h3> Have you been eating colorfully in the past 7 days? </h3>
      <Summary uID={uID} />

    </div>
  );
}

export default App;



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

  // <div id="firebaseui-auth-container"></div>
  // <div id="loader">Loading...</div> 