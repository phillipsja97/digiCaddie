import React from 'react';
import firebase from 'firebase/app';
import ScoresChart from '../../Shared/ScoresChart/ScoresChart';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';
import 'firebase/auth';
import './Home.scss';

class Home extends React.Component {

  getUserScores = (uid) => {
    scoresData.getScoresByUid(uid)
      .then((userScores) => {
        this.setState({ userScores });
        console.log(userScores);
      })
      .catch((errorFromScoresData) => console.error(errorFromScoresData));
  }

  componentDidMount() {
    this.getUserScores((authData.getUid()));
  }

  render() {
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const userEmail = user.email;
    const photo = user.photoURL;
    const { userScores } = this.state;
    return (
      <div className="Home d-flex flex-wrap">
        <div className="container-fluid">
          <div className="profileCardSection d-flex justify-content-center">
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
      </div>
      <div className="chart">
        <ScoresChart userScores={this.state.userScores} />
      </div>
      </div>
    );
  }
}

export default Home;
