import React from 'react';
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
  state = {
    newScore: '',
    newScoreDate: '',
  }

  saveScoreEvent = (e) => {
    e.preventDefault();
    const { handleClose, getScoresAndGraph } = this.props;
    const { slicedUserScores } = this.state;
    console.log(slicedUserScores, 'newslice');
    const newScore = {
      score: this.state.newScore,
      date: this.state.newScoreDate,
      uid: authData.getUid(),
    };
    scoresData.saveScores(newScore)
      .then(() => {
        getScoresAndGraph();
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
<div className="Modal">
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Col xs={6} md={4}>
          <Image src={photo} roundedCircle className="photoComment"/>
        </Col>
        <Modal.Title>Add Score</Modal.Title>
        </Modal.Header>
        <InputGroup className="mb-3">
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.newScore}
            onChange={this.scoreChange}
          />
        </InputGroup>
        <div class="form-group">
          <label for="date" class="col-sm-2 col-form-label">Date</label>
            <div class="col-sm-10">
              <input type="date" class="form-control" value={this.state.newScoreDate} onChange={this.dateChange} id="inputPassword"/>
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
