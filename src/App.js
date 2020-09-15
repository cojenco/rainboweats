import React, {useState} from 'react';
import './App.css';
import Upload2 from './components/upload2'
import Summary from './components/summary'
import rainbowImage from './rainbowFood.jpg'
import SignIn from './components/signin';
var firebase = require('firebase');

function App() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };

  // Initialize Firebase and avoid duplicates
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  // useState: store uID and username
  const [uID, setuID] = useState('')
  const [username, setUsername] = useState('')

  // Callback function to set state username, sending as props
  const getUsername = (name) => {
    setUsername(name);
  };

  // Callback function to set state uID, sending as props
  const getID = (id) => {
    setuID(id);
  };

  
  return (
    <div className="App">
      <img 
        src={rainbowImage} 
        alt="a rainbow of veggies and fruit authorized by Happy Healthy Couple"
        className="w-50">
      </img>

      <h1>Eat a Rainbow</h1>
      <SignIn getUsername={getUsername} getID={getID} />

      { uID && 
      <section>
        <p className="blue-font">Hi {username}! </p>

        <div className="d-flex flex-column justify-content-center flex-wrap my-5">
          <div className="h-25 add-topic my-2"> <h3> Add <br></br> color </h3> </div>
          <div className="h-25 my-2"><Upload2 uID={uID} /></div>
        </div>

        <div className="d-flex flex-column justify-content-center flex-wrap my-5">
          <div className="h-25 my-2"> <h3> Get <br></br> summary </h3> </div>
          <div className="h-75 my-2"> <p className="summary-line">Have you been eating colorfully in the past 7 days? </p> <Summary uID={uID} /> </div>
        </div>
      </section>}
    </div>
  );
}

export default App;