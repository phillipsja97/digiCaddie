import React from 'react';
import firebase from 'firebase/app';
import ScoresChart from '../../Shared/ScoresChart/ScoresChart';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';
import 'firebase/auth';
import './Home.scss';

class Home extends React.Component {
  state = {
    userScores: [],
    average: [],
  }

  getUserScoresForAvg = (uid) => {
    scoresData.getScoresByUid(uid)
      .then((average) => {
        const scores = average.map((x) => Number(x.score));
        const total = scores.reduce((a, b) => a + b, 0);
        const avg = Math.round(total / average.length);
        this.setState({ average: avg });
      })
      .catch((errorFromScoresData) => console.error(errorFromScoresData));
  }

  componentDidMount() {
    this.getUserScoresForAvg(authData.getUid());
  }

  render() {
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const userEmail = user.email;
    const photo = user.photoURL;
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
                <div className="container-fluid d-flex justify-content-center">
                  <div className="card-header userDetailsSection">
                        <h5>User Stats:</h5>
                        <ul className="list-group list-group-xl">
                          <li className="list-group-item">Average Score: {this.state.average}</li>
                          <li className="list-group-item">Total Posts</li>
                        </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="chart d-flex justify-content-center">
        <ScoresChart userScores={this.state.userScores} getUserScoresForAvg={this.getUserScoresForAvg} average={this.state.average} />
      </div>
      <div className="container">
        <br/>
      </div>
      </div>
      </div>
    );
  }
}

export default Home;
