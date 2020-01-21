import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <h1>Auth</h1>
          <button className="btn btn-outline-primary" onClick={this.loginClickEvent}>Login With Google</button>
      </div>
    );
  }
}

export default Auth;
