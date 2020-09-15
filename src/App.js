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