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
      <div className="Home d-flex justify-content-center">
        <div class="card mb-3 profileCard">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src={photo} class="card-img profileImage" alt={name} />
            </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h1 class="card-title">{name}</h1>
                  <p class="card-text">{userEmail}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
