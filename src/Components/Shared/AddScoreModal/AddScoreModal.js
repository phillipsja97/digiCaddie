import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  InputGroup,
  FormControl,
  Col,
  Image,
} from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';

class AddScoreModal extends React.Component {
  static propTypes = {
    newScore: PropTypes.string,
    newScoreDate: PropTypes.string,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    getScoresAndGraph: PropTypes.func,
    getUserScoresForAvg: PropTypes.func,
  }

  state = {
    newScore: '',
    newScoreDate: '',
  }

  saveScoreEvent = (e) => {
    e.preventDefault();
    const { handleClose, getScoresAndGraph, getUserScoresForAvg } = this.props;
    const newScore = {
      score: this.state.newScore,
      date: this.state.newScoreDate,
      uid: authData.getUid(),
    };
    scoresData.saveScores(newScore)
      .then(() => {
        getScoresAndGraph();
      }).then(() => {
        getUserScoresForAvg(authData.getUid());
      })
      .catch((errorFromSaveScore) => console.error(errorFromSaveScore));
    handleClose();
  }

  scoreChange = (e) => {
    e.preventDefault();
    this.setState({ newScore: e.target.value });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ newScoreDate: e.target.value });
  }

  render() {
    const { show, handleClose } = this.props;
    const user = firebase.auth().currentUser;
    const photo = user.photoURL;
    return (
<div className="Modal d-flex justify-content-center">
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Col xs={6} md={4}>
          <Image src={photo} roundedCircle className="photoComment"/>
        </Col>
        <Modal.Title>Add Score</Modal.Title>
        </Modal.Header>
        <div className="d-flex justify-content-center">
        <div className="d-inline-flex justify-content-center">
        <label htmlFor="basic-url" className="d-flex justify-content-center">Score: </label>
        <InputGroup className="mb-3">
          <Col xs={12}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.newScore}
            onChange={this.scoreChange}
          />
          </Col>
        </InputGroup>
        </div>
        </div>
        <div className="form-group d-flex justify-content-center">
          <label className="col-sm-2 col-form-label">Date</label>
            <div className="col-sm-10">
              <input type="date" className="form-control" value={this.state.newScoreDate} onChange={this.dateChange} id="inputPassword"/>
            </div>
         </div>
        <Modal.Footer>
          <button className="btn btn-outline-danger" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-outline-primary" onClick={this.saveScoreEvent}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
     </div>
    );
  }
}

export default AddScoreModal;
