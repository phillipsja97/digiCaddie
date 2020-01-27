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
import './EditModal.scss';

class EditModal extends React.Component {
  state = {
    editMessage: '',
  }

  saveCommentEvent = (e) => {
    e.preventDefault();
    const theHoleId = this.props.match.params.holeId;
    const theCourseId = this.props.match.params.courseId;
    const newComment = {
      message: this.state.newMessage,
      holeId: this.props.match.params.holeId,
      uid: authData.getUid(),
    };
    commentsData.saveComment(newComment)
      .then(() => this.props.history.push(`/course/${theCourseId}/${theHoleId}/`))
      .catch((errorFromSaveComment) => console.error(errorFromSaveComment));
  }

  componentDidMount() {
    const { comment } = this.props;
    if (comment.id) {
           this.setState({ editMessage: this.props.comment.message });
    }
  }

  editCommentEvent = (e) => {
    e.preventDefault();
    const { singleHoleId, theCourseId, handleClose, getCommentsByHoleId } = this.props;
    const { theCommentId, comment } = this.props;
    const updatedComment = {
      message: this.state.editMessage,
      holeId: this.props.singleHoleId,
      uid: authData.getUid()
    };
    commentsData.updateComment(comment.id, updatedComment)
      .then(() => {
        getCommentsByHoleId(singleHoleId);
      })
      .catch((errorFromSaveComment) => console.error(errorFromSaveComment));
      handleClose();
  }

  messageChange = (e) => {
    e.preventDefault();
    this.setState({ editMessage: e.target.value });
  }



  render() {
    const { show, handleClose, comment } = this.props;
    const user = firebase.auth().currentUser;
    const photo = user.photoURL;
    return (
     <div className="Modal">
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Col xs={6} md={4}>
          <Image src={photo} roundedCircle className="photoComment"/>
        </Col>
        <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>With textarea</InputGroup.Text>
            </InputGroup.Prepend>
          <FormControl as="textarea" aria-label="With textarea" value={this.state.editMessage} onChange={this.messageChange} />
        </InputGroup>
        <Modal.Footer>
          <button className="btn btn-outline-danger" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-outline-primary" onClick={this.editCommentEvent}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
     </div>
    );
  }
}

export default EditModal;