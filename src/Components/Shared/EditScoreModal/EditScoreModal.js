/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import 'firebase/auth';
import ScoreCard from '../ScoreCard/ScoreCard';
import './EditScoreModal.scss';

class EditScoreModal extends React.Component {
  static propTypes = {
    editShow: PropTypes.bool,
    handleEditClose: PropTypes.func,
    getScoresAndGraph: PropTypes.func,
    deleteScore: PropTypes.func,
    getUserScoresForAvg: PropTypes.func,
  }

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
      getUserScoresForAvg,
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
       { this.props.slicedUserScores.map((scores) => <ScoreCard key={scores.id} scores={scores} editShow={editShow} handleEditClose={handleEditClose} deleteScore={deleteScore} getScoresAndGraph={getScoresAndGraph} getUserScoresForAvg={getUserScoresForAvg} />)}
        </Modal.Body>
      </Modal>
     </div>
    );
  }
}

export default EditScoreModal;
