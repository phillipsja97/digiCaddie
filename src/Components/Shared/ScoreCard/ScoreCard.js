/* eslint-disable max-len */
import React from 'react';
import EditScoreModal2 from '../EditScoreModal2/EditScoreModal2';

class ScoreCard extends React.Component {
  state = {
    editShow2: false,
  }

  handleEditShow2 = (e) => {
    e.preventDefault();
    this.setState({ editShow2: true });
  }

  handleEditClose2 = (e) => {
    this.setState({ editShow2: false });
  }

  deleteScoreEvent = (e) => {
    e.preventDefault();
    const { deleteScore, scores } = this.props;
    deleteScore(scores.id);
  }

  render() {
    const { scores, handleEditClose, getScoresAndGraph, getUserScoresForAvg } = this.props;
    return (
      <div className="ScoreCard">
        <div className="card d-flex justify-content-center">
          <div className="card-header d-flex justify-content-center">
            {scores.date}
          </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-center">{scores.value}</li>
              <li className="list-group-item d-inline-flex justify-content-center">
              <button className="btn btn-outline-primary" onClick={this.handleEditShow2}>Edit This Score</button>
              <button className="btn btn-outline-danger" onClick={this.deleteScoreEvent}>Delete the Score</button>
              </li>
            </ul>
          </div>
          <EditScoreModal2 scores={scores} editShow2={this.state.editShow2} handleEditClose2={this.handleEditClose2} handleEditClose={handleEditClose} getScoresAndGraph={getScoresAndGraph} getUserScoresForAvg={getUserScoresForAvg}/>
      </div>
    );
  }
}

export default ScoreCard;
