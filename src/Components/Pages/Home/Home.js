import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Home.scss';

class Home extends React.Component {
  render() {
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const userEmail = user.email;
    const photo = user.photoURL;
    return (
      <div className="Home">
        <h1 className="d-flex justify-content-center profileTitle">Profile Information</h1>
        <div className="d-flex homeContainer">
          <div className="offset-1 profileInfo">
            <img src={photo} alt="user Image" className="userImage" />
          </div>
            <div className="offset-1 nameEmailContainer">
              <h2 className="userName">Profile Name: {name}</h2>
              <h2 className="userEmail">Profile Email: {userEmail}</h2>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
