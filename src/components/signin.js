import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


class SignIn extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

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

  // Use callback function from props to sendback uID and username
  componentDidUpdate() {
    if (this.state.isSignedIn) {
      this.props.getID(firebase.auth().currentUser.uid);
      this.props.getUsername(firebase.auth().currentUser.displayName);
    }
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
      <div></div>
    );
  }
}

export default SignIn;