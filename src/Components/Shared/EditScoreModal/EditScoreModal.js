import React from 'react';
import {
  Modal,
  Button,
  Form,
  Col,
} from 'react-bootstrap';
import firebase from 'firebase/app';
import commentsData from '../../../Helpers/data/commentsData';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';
import 'firebase/auth';
import ScoreCard from '../ScoreCard/ScoreCard';
import './EditScoreModal.scss';

class EditScoreModal extends React.Component {
  state = {
    slicedUserScores: [],
  }

  newScoresData = () => {
    scoresData.getScoresByUid(authData.getUid())
      .then((userScores) => {
        const sortedScores = userScores.sort((a, b) => new Date(a.date) - new Date(b.date));
        const scoreId = sortedScores.map((y) => new Object({ date: y.date, value: y.score, id: y.id }));
        scoreId.sort((a, b) => a.id - b.id);
        const slicedUserScores = scoreId.slice(-5);
        console.log(slicedUserScores, 'sliced');
        this.setState({ slicedUserScores });
        console.log('userScoresUpdate', slicedUserScores);
      });
  }

  componentDidMount() {
    this.newScoresData();
  }

  render() {
    const { editShow, handleEditClose, deleteScore, getScoresAndGraph } = this.props;
    const { slicedUserScores } = this.state;
    return (
     <div className="Modal">
       <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       { this.state.slicedUserScores.map((scores) => <ScoreCard key={scores.id} scores={scores} editShow={editShow} handleEditClose={handleEditClose} deleteScore={deleteScore} getScoresAndGraph={getScoresAndGraph} />)}
        </Modal.Body>
      </Modal>
     </div>
    );
  }
}

export default EditScoreModal;
