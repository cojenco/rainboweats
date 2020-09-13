// import React from 'react';
// import {useDropzone} from 'react-dropzone';


// function Upload (props) {
//   const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
//     onDropHandler(files) {      
//       var file = files[0]
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         console.log(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   });

//   const files = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   const onUploadClick = () => {
//     console.log('preparing to upload')

//     if (acceptedFiles.length) {
//       console.log('detect files')

//       acceptedFiles.map(file => {
//         console.log(file)
        

//         const reader = new FileReader();
//         reader.onload = (event) => {
//           console.log(event.target.result);
//         };
//         const data = reader.readAsDataURL(file);
//         // const data = reader.readAsArrayBuffer(file);
//         console.log(data);
//         // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
//         // The blob's result cannot be directly decoded as Base64 without first removing the Data-URL declaration preceding the Base64-encoded data. To retrieve only the Base64 encoded string, first remove data:*/*;base64, from the result.
//         // call cloud function 
//       })
//       // do something: make an http call to the uploadfile function I wrote
//     }

//   }
  
//   return (
//     <section className="container">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <p>Drag and drop a file here, or click to select files</p>
//       </div>
//       <button onClick={onUploadClick} > UPLOAD </button>
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//   );
// }

// export default Upload;


// // File {path: "chairs.png", name: "chairs.png", lastModified: 1592551363428, 
// // lastModifiedDate: Fri Jun 19 2020 00:22:43 GMT-0700 (Pacific Daylight Time), 
// // webkitRelativePath: "", …}
// // lastModified: 1592551363428
// // lastModifiedDate: Fri Jun 19 2020 00:22:43 GMT-0700 (Pacific Daylight Time) {}
// // name: "chairs.png"
// // path: "chairs.png"
// // size: 927462
// // type: "image/png"
// // webkitRelativePath: ""
// // __proto__: File



// Import FirebaseAuth and firebase.
import React, {useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


class Upload extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
  // const [uID, setuID] = useState('');
  // const [username, setUsername] = useState('');


  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h3>Add colors to your diet for good nutrition!</h3>
          <h3>Upload photos of your daily meals and track how colorful you've been eating</h3>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

export default Upload;