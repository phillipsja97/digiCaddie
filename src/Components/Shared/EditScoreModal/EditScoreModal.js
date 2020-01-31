/* eslint-disable max-len */
import React from 'react';
import { Modal } from 'react-bootstrap';
import 'firebase/auth';
import ScoreCard from '../ScoreCard/ScoreCard';
import './EditScoreModal.scss';

class EditScoreModal extends React.Component {
  state = {
    slicedUserScores: [],
  }

  newScoresData = () => {
    const { slicedUserScores } = this.props;
    return slicedUserScores;
  }

  componentDidMount() {
    this.newScoresData();
  }

  render() {
    const {
      editShow,
      handleEditClose,
      deleteScore,
      getScoresAndGraph,
    } = this.props;
    return (
     <div className="Modal">
       <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <div className="d-flex offset-2">
          <Modal.Title>Choose Which Score to Edit:</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
       { this.props.slicedUserScores.map((scores) => <ScoreCard key={scores.id} scores={scores} editShow={editShow} handleEditClose={handleEditClose} deleteScore={deleteScore} getScoresAndGraph={getScoresAndGraph} />)}
        </Modal.Body>
      </Modal>
     </div>
    );
  }
}

export default EditScoreModal;
