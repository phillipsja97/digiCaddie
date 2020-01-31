import React from 'react';
import authData from '../../../Helpers/data/authData';
import commentsData from '../../../Helpers/data/commentsData';

class EditComment extends React.Component {
  state = {
    editMessage: '',
  }

  componentDidMount() {
    const theCommentId = this.props.match.params.commentId;
    if (theCommentId) {
      commentsData.getSingleComment(theCommentId)
        .then((request) => {
          const comment = request.data;
          this.setState({ editMessage: comment.message });
        })
        .catch((errorFromEditMessage) => (errorFromEditMessage));
    }
  }

  editCommentEvent = (e) => {
    e.preventDefault();
    const theHoleId = this.props.match.params.holeId;
    const theCourseId = this.props.match.params.courseId;
    const theCommentId = this.props.match.params.commentId;
    const updatedComment = {
      message: this.state.editMessage,
      holeId: this.props.match.params.holeId,
      uid: authData.getUid(),
    };
    commentsData.updateComment(theCommentId, updatedComment)
      .then(() => this.props.history.push(`/course/${theCourseId}/${theHoleId}`))
      .catch((errorFromUpdateComment) => console.error(errorFromUpdateComment));
  }

  messageChange = (e) => {
    e.preventDefault();
    this.setState({ editMessage: e.target.value });
  }

  render() {
    return (
      <div className="AddComment">
        <form className="col-6 offset-0">
          <div className="form-group">
            <label htmlFor="edit-message">Edit Message</label>
            <input
              type="text"
              className="form-control"
              id="edit-message"
              placeholder="Enter new comment here.."
              value={this.state.editMessage}
              onChange={this.messageChange}
              />
          </div>
          <button className="btn btn-outline-primary" onClick={this.editCommentEvent}>Update Comment</button>
        </form>
      </div>
    );
  }
}

export default EditComment;
