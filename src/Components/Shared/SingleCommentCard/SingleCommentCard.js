import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../../../Helpers/data/authData';
import commentsData from '../../../Helpers/data/commentsData';
import EditModal from '../EditModal/EditModal';
import './SingleCommentCard.scss';

class SingleCommentCard extends React.Component {
  state = {
    show: false,
    commentId: '',
    comment: [],
  }

handleClose = () => this.setState({ show: false });

handleShow = () => this.setState({ show: true });

handleClick = (e) => {
  const { commentId } = this.state;
  this.state.commentId = e.target.getAttribute('id');
  console.log(commentId);
  this.handleShow();
}

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
    const { commentId } = this.state;
    return (
        <div className="SingleCommentCard">
         <div className="card mb-3 col-6">
          <button className="btn btn-outline-danger col-1" onClick={this.deleteCommentEvent}>X</button>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={photo} className="card-img commentImage" alt={name} />
            </div>
              <div className="d-flex justify-content-start">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{comment.message}</p>
                  <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
            <button className="btn btn-outline-primary" id={comment.id} onClick={this.handleClick}>
              Edit Comment
            </button>
            <EditModal show={this.state.show} comment={comment} handleClose={this.handleClose} singleHoleId={singleHoleId} theCourseId={theCourseId} getCommentsByHoleId={getCommentsByHoleId} />
           {/* <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${theHoleId}/add`}>Add New Comment</Link>
            <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${theHoleId}/${comment.id}/edit`}>Edit Comment</Link> */}
          </div>
        </div>
    );
  }
}

export default SingleCommentCard;
