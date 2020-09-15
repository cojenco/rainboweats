import React, {useState} from 'react';
import './App.css';
import Upload from './components/upload'
import Upload2 from './components/upload2'
import Summary from './components/summary'
import rainbowImage from './rainbowFood.jpg'
import SignIn from './components/signin';
var firebase = require('firebase');

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

  // store uID and username
  const [uID, setuID] = useState('')
  const [username, setUsername] = useState('')

  // var provider = new firebase.auth.GoogleAuthProvider();
  // firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   // console.log(user);
  //   // console.log(result.additionalUserInfo.profile)
  //   console.log(result.additionalUserInfo.profile.id)
  //   setuID(result.additionalUserInfo.profile.id)
  //   setUsername(result.additionalUserInfo.profile.given_name)
  // }).catch(function(error) {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   var email = error.email;
  //   var credential = error.credential;
  // });

  const getUsername = (name) => {
    setUsername(name);
  };

  const getID = (id) => {
    setuID(id);
  };

  
  return (
    <div className="App">
      <img 
        src={rainbowImage} 
        // src="https://lh3.googleusercontent.com/lOO6fNTGSvuaxzss_51bEQH9lyiHLYTFT0MtaiZeGpPL-dcWrV--0grms_BRjDcpgi9YHqh3F8jRSxn-s7SusvtHKqa1G7I4UbaDrjCFz5s9gDsuu9_3W-gicCICOYB-bBSoXReSMShyFMpdQLyEe5XZFkNOpQaHrEuY51jW7eJYLPFOb2OnIJgvN1DVekKDAm8qjj5SyDaiDVrXTMuCVpWUVUvqcL10FqTzcLm5YSip2GEHttSAZAgrkTpzRC9fmtyo5AfdAdBdqPSzGX30ZlyReutTCx2a7880yp3dDXo-kdPLG2hncJ4FsuoegMWXXVk5u3zVgFV6GSl_nt-OhgsKkRexENHBqTreRQ72k_PQ2dpzAW5_0geOoSlcUqMY3o2Nor84qwyo3jvOegL8MSLJ81xGDMUy33_z7uCbXCxro_dPDT9VQnG7AbbGbA_OObaW3BjAQpfKYBtzh2WD3ZPlHCF-sneei37sOk6pce112WqHL6QOCjHwjAyoLII6fG48uZUn45VCiw8TID0H333DpVdMKPfi0sWW0yPbVtzakAS51YtH0_uw9l_hZG19wvZMtA_uXN8gu45KJvghoOZZoyXMQIPNPb5eaOLtDmiS4Qulc46d1haf5cOAq9VnHzS9pvPAx2w1odz-QjQ2MZ5K95xSPF_UGjUjCTJnB2Dh8FWa-M5ztE60GpBxKw=w780-h521-no?authuser=0" 
        alt="a rainbow of veggies and fruit authorized by Happy Healthy Couple"
        className="w-50">
      </img>

      <h1>Eat a Rainbow</h1>
      <SignIn getUsername={getUsername} getID={getID} />
      <p className="blue-font">Hi {username}! </p>

      <div className="d-flex flex-column justify-content-center flex-wrap my-5">
        <div className="h-25 add-topic my-2"> <h3> Add <br></br> color </h3> </div>
        <div className="h-25 my-2"><Upload2 uID={uID} /></div>
      </div>

      <div className="d-flex flex-column justify-content-center flex-wrap my-5">
        <div className="h-25 my-2"> <h3> Get <br></br> summary </h3> </div>
        <div className="h-75 my-2"> <p className="summary-line">Have you been eating colorfully in the past 7 days? </p> <Summary uID={uID} /> </div>
      </div>
    </div>
  );
}

export default App;