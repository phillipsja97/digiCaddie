import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './Home.scss';

class Home extends React.Component {
  render() {
    var user = firebase.auth().currentUser;
    const name = user.displayName;
    const userEmail = user.email;
    const photo = user.photoURL;
    return (
      <div className="Home">
      <h1>Hello</h1>
      <h1>{name}</h1>
      <h1>{userEmail}</h1>
      <img src={photo} className="userPhoto"></img>
      </div>
    );
  }
}

export default Home;
