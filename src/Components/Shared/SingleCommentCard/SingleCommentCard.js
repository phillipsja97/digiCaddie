import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import authData from '../../../Helpers/data/authData';
import './SingleCommentCard.scss';

class SingleCommentCard extends React.Component {

  deleteCommentEvent = (e) => {
    e.preventDefault();
    const { deleteComment, comment } = this.props;
    deleteComment(comment.id);
  }

  render() {
    const { comment } = this.props;
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const photo = user.photoURL;
    const { theHoleId, theCourseId } = this.props;
    return (
      <div className="SingleCommentCard">
        <button className="btn btn-outline-danger" onClick={this.deleteCommentEvent}>X</button>
        <div className="media">
          <img src={photo} className="mr-3 courseImage" alt={name} />
            <div className="media-body">
              <h2>{name}</h2>
              <p>{comment.message}</p>
            </div>
        <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${theHoleId}/add`}>Add New Comment</Link>
        <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${theHoleId}/edit`}>Edit Comment</Link>
      </div>
    </div>
    );
  }
}

export default SingleCommentCard;
