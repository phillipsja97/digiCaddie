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
import './EditScoreModal2.scss';

class EditScoreModal2 extends React.Component {
  editScoreEvent = (e) => {
    e.preventDefault();
    const { handleEditClose } = this.props;
    const { slicedUserScores, editScore } = this.state;
    console.log('editScore', editScore);
    // const scoreId = this.state.slicedUserScores.map((userScore) => editScore.find((s) => s.id === userScore.id));
    const updatedScore = {
      value: this.state.editScore,
      date: this.state.editDate,
      uid: authData.getUid(),
    };
    console.log(updatedScore, 'scoreObject');
    // console.log(scoreId, 'scoreId');
    // commentsData.updateComment(slicedUserScores.id, updatedScore)
    //   .then(() => {
    //     // getCommentsByHoleId(singleHoleId);
    //   })
    //   .catch((errorFromSaveComment) => console.error(errorFromSaveComment));
    handleEditClose();
}

  render() {
    const { editShow, handleEditClose } = this.props;
    const { slicedUserScores } = this.state;
    console.log('orig', slicedUserScores);
    const editDates = slicedUserScores.map((scores) => new Object(<option>{scores.date}</option>));
    console.log(editDates, 'need it');
    const editScores = slicedUserScores.map((scores) => new Object(<option>{scores.score}</option>));
    const user = firebase.auth().currentUser;
    const photo = user.photoURL;
    return (
      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <div className="d-flex justify-content-center">
          <Form.Label>Select which date you want to update:</Form.Label>
        </div>
          <div className="d-flex justify-content-center">
            <Col xs={6}>
              <Form.Control as="select" onChange={this.dateChange}>
                {editDates}
              </Form.Control>
            </Col>
          </div>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
        <div className="d-flex justify-content-center">
          <Form.Label>Update Your Score:</Form.Label>
        </div>
        <div className="d-flex justify-content-center">
          <Col xs={6}>
            <Form.Control type="text" onChange={this.scoreChange}/>
          </Col>
        </div>
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.editScoreEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditScoreModal2;
