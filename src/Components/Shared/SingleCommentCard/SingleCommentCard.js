import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import authData from '../../../Helpers/data/authData';
import CommentModal from '../Modal/Modal';
import './SingleCommentCard.scss';

class SingleCommentCard extends React.Component {
  state = {
    show: false,
  };

handleClose = () => this.setState({ show: false,  });

handleShow = () => this.setState({ show: true });

  deleteCommentEvent = (e) => {
    e.preventDefault();
    const { deleteComment, comment } = this.props;
    deleteComment(comment.id);
  }

  render() {
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const photo = user.photoURL;
    const { theCourseId, singleHoleId, comment, getCommentsByHoleId } = this.props;
    return (
        <div className="SingleCommentCard">
         <div class="card mb-3 col-6">
          <button className="btn btn-outline-danger col-1" onClick={this.deleteCommentEvent}>X</button>
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src={photo} class="card-img commentImage" alt={name} />
            </div>
              <div class="d-flex justify-content-start">
                <div class="card-body">
                  <h5 class="card-title">{name}</h5>
                  <p class="card-text">{comment.message}</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
            <button className="btn btn-outline-primary" onClick={this.handleShow}>
              Launch demo modal
            </button>
            <CommentModal show={this.state.show} handleClose={this.handleClose} singleHoleId={singleHoleId} theCourseId={theCourseId} getCommentsByHoleId={getCommentsByHoleId} />
           {/* <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${theHoleId}/add`}>Add New Comment</Link>
            <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${theHoleId}/${comment.id}/edit`}>Edit Comment</Link> */}
          </div>
        </div>
    );
  }
}

export default SingleCommentCard;
