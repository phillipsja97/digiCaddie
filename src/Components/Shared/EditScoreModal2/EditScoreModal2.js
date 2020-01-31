import React from 'react';
import {
  Modal,
  Button,
  Form,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import firebase from 'firebase/app';
import commentsData from '../../../Helpers/data/commentsData';
import authData from '../../../Helpers/data/authData';
import scoresData from '../../../Helpers/data/scoresData';
import 'firebase/auth';
import './EditScoreModal2.scss';

class EditScoreModal2 extends React.Component {
  state = {
    editDate: '',
    editScore: '',
  }

  editScoreEvent = (e) => {
    e.preventDefault();
    const { handleEditClose2, scores, getScoresAndGraph, handleEditClose } = this.props;
    const { editScore } = this.state;
    console.log('editScore', editScore);
    const updatedScore = {
      score: this.state.editScore,
      date: this.state.editDate,
      uid: authData.getUid(),
    };
    scoresData.updateScore(scores.id, updatedScore)
      .then(() => {
        getScoresAndGraph();
      })
      .catch((errorFromSaveComment) => console.error(errorFromSaveComment));
    handleEditClose2();
    handleEditClose();
  }

    editDateChange = (e) => {
      e.preventDefault();
      const { editDate } = this.state;
      this.setState({ editDate: e.target.value });
      console.log(editDate, 'editscore');
    }

    editScoreChange = (e) => {
      e.preventDefault();
      const { editScore } = this.state;
      this.setState({ editScore: e.target.value });
    }


    render() {
      const { editShow2, handleEditClose2 } = this.props;
      return (
      <Modal show={editShow2} onHide={handleEditClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Score</Modal.Title>
        </Modal.Header>
        <div class="form-group d-flex justify-content-center">
          <label for="date" className="col-sm-2 col-form-label">Date</label>
            <div class="col-sm-10">
              <input type="date" class="form-control" value={this.state.editDate} onChange={this.editDateChange} id="inputPassword"/>
            </div>
         </div>
         <InputGroup className="mb-3">
          <Col xs={6}>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={this.state.editScore}
            onChange={this.editScoreChange}
          />
          </Col>
        </InputGroup>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose2}>
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
