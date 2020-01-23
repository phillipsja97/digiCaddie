import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './SingleCommentCard.scss';

class SingleCommentCard extends React.Component {
  render() {
    const { comment } = this.props;
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const photo = user.photoURL;
    return (
      <div className="SingleCourseCard">
        <div className="media">
          <img src={photo} className="mr-3 courseImage" alt={name} />
            <div className="media-body">
              <h2>{name}</h2>
              <p>{comment.message}</p>
            </div>
      </div>
    </div>
    );
  }
}

export default SingleCommentCard;
