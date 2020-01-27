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
        <div className="card mb-3 profileCard">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={photo} className="card-img profileImage" alt={name} />
            </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h1 className="card-title">{name}</h1>
                  <p className="card-text">{userEmail}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
