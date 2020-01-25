import React from 'react';
import {
  Modal,
  InputGroup,
  FormControl,
  Col,
  Image,
} from 'react-bootstrap';
import firebase from 'firebase/app';
import commentsData from '../../../Helpers/data/commentsData';
import authData from '../../../Helpers/data/authData';
import 'firebase/auth';
import './Modal.scss';

class CommentModal extends React.Component {
  state = {
    newMessage: '',
  }

  saveCommentEvent = (e) => {
    e.preventDefault();
    const { singleHoleId, theCourseId, handleClose, getCommentsByHoleId } = this.props;
    const newComment = {
      message: this.state.newMessage,
      holeId: this.props.singleHoleId,
      uid: authData.getUid(),
    };
    commentsData.saveComment(newComment)
      .then(() => {
        getCommentsByHoleId(singleHoleId);
      })
      .catch((errorFromSaveComment) => console.error(errorFromSaveComment));
      handleClose();
  }

  messageChange = (e) => {
    e.preventDefault();
    this.setState({ newMessage: e.target.value });
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
        <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>With textarea</InputGroup.Text>
            </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="With textarea" value={this.state.newMessage} onChange={this.messageChange} />
        </InputGroup>
        <Modal.Footer>
          <button className="btn btn-outline-danger" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-outline-primary" onClick={this.saveCommentEvent}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
     </div>
    );
  }
}

export default CommentModal;
