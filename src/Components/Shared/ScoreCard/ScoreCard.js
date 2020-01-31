import React from 'react';

class ScoreCard extends React.Component {

  handleEditShow = (e) => {
    e.preventDefault();
    const { editShow2 } = this.props;
    this.setState({ editShow2: true });
  }

  deleteScoreEvent = (e) => {
    e.preventDefault();
    const { deleteScore, scores } = this.props;
    deleteScore(scores.id);
    
  }

  render() {
    const { scores, editShow2 } = this.props;
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
      </div>
    );
  }
}

export default ScoreCard;
