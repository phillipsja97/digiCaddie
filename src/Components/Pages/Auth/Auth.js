import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <div className="mainContainer">
          <div className="topContainer">
          </div>
            <div className="middleContainer">
              <button className="loginButton" onClick={this.loginClickEvent}><img src="https://res.cloudinary.com/holiday-images/image/upload/v1569859896/google-sign-in_v3yhxi.png" className="loginButtonImage" /></button>
            </div>
          <div className="bottomContainer">
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
