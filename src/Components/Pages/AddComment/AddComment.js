import React from 'react';
import authData from '../../../Helpers/data/authData';
import commentsData from '../../../Helpers/data/commentsData';

class AddComment extends React.Component {
  state = {
    newMessage: '',
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
      .then(() => this.props.history.push(`/course/${theCourseId}/${theHoleId}`))
      .catch((errorFromSaveComment) => console.error(errorFromSaveComment));
  }

  messageChange = (e) => {
    e.preventDefault();
    this.setState({ newMessage: e.target.value });
  }

  render() {
    return (
      <div className="AddComment">
        <form className="col-6 offset-0">
          <div className="form-group">
            <label htmlFor="new-message">New Message</label>
            <input
              type="text"
              className="form-control"
              id="new-message"
              placeholder="Enter new comment here.."
              value={this.state.newMessage}
              onChange={this.messageChange}
              />
          </div>
          <button className="btn btn-outline-primary" onClick={this.saveCommentEvent}>Save New Comment</button>
        </form>
      </div>
    );
  }
}

export default AddComment;
