/* eslint-disable max-len */
import React from 'react';
import firebase from 'firebase/app';
import ScoresChart from '../../Shared/ScoresChart/ScoresChart';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';
import commentsData from '../../../Helpers/data/commentsData';
import scoreShape from '../../../Helpers/propz/scoreShape';
import 'firebase/auth';
import './Home.scss';
import commentShape from '../../../Helpers/propz/commentShape';

class Home extends React.Component {
  static propTypes = {
    average: scoreShape.scoreShape,
    totalComments: commentShape.commentShape,
  }

  state = {
    userScores: [],
    average: [],
    totalComments: [],
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

  getTotalComments = (uid) => {
    commentsData.getAllCommentsByUid(uid)
      .then((totalComments) => {
        const comments = totalComments.length;
        this.setState({ totalComments: comments });
      })
      .catch((errorFromTotalComments) => console.error(errorFromTotalComments));
  }

  componentDidMount() {
    this.getUserScoresForAvg(authData.getUid());
    this.getTotalComments(authData.getUid());
  }

  render() {
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const userEmail = user.email;
    const photo = user.photoURL;
    return (
      <div className="Home">
        <div class="jumbotron jumbotron-fluid homeJumbo">
          <div class="container">
            <h1 class="display-4">{name} Profile</h1>
          </div>
        </div>
        <div className="container-fluid theProfile">
          <div className="profileCardSection d-flex justify-content-center">
        <div className="card mb-3 profileCard">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={photo} className="card-img profileImage" alt={name} />
            </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text cardTextBody">Email: {userEmail}</p>
                </div>
                <div className="container-fluid d-flex justify-content-center">
                  <div className="card-header userDetailsSection">
                        <h5>User Stats:</h5>
                        <ul className="list-group list-group-xl">
                          <li className="list-group-item">Average Score: {this.state.average}</li>
                          <li className="list-group-item">Total Posts: {this.state.totalComments}</li>
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
      </div>
      </div>
    );
  }
}

export default Home;
