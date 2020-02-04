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
import commentsData from '../../../Helpers/data/commentsData';

class AddModal extends React.Component {
  static propTypes = {
    newMessage: PropTypes.string,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    singleHoleId: PropTypes.string,
    theCourseId: PropTypes.string,
    getCommentsByHoleId: PropTypes.func,
  }

  state = {
    newMessage: '',
  }

  saveCommentEvent = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const {
      singleHoleId,
      getCommentsByHoleId,
      handleClose,
    } = this.props;
    const newComment = {
      message: this.state.newMessage,
      holeId: singleHoleId,
      uid: authData.getUid(),
      avatarUrl: user.photoURL,
      name: user.displayName,
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

export default AddModal;
