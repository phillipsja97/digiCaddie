/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/image';
import commentShape from '../../../Helpers/propz/commentShape';
import EditModal from '../EditModal/EditModal';
import authData from '../../../Helpers/data/authData';

import './SingleCommentCard.scss';

class SingleCommentCard extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    comment: commentShape.commentShape,
    deleteComment: PropTypes.func,
    theCourseId: PropTypes.string,
    singleHoleId: PropTypes.string,
    getCommentsByHoleId: PropTypes.func,
    handleClose: PropTypes.func,
  }

  state = {
    show: false,
    comment: [],
  }

handleClose = () => this.setState({ show: false });

handleShow = () => this.setState({ show: true });

  deleteCommentEvent = (e) => {
    e.preventDefault();
    const { deleteComment, comment } = this.props;
    deleteComment(comment.id);
  }

  render() {
    const {
      theCourseId,
      singleHoleId,
      comment,
      getCommentsByHoleId,
    } = this.props;
    return (
        <div className="SingleCommentCard">
         <div className="card col-6 pl-0 pr-0 singleCard">
         { (authData.getUid() === comment.uid) ? <div className="exitButton mx-0">
                                                <button className="btn btn-danger col-1" onClick={this.deleteCommentEvent}>X</button>
                                                </div>
           : <div></div>
          }
          <div className="row no-gutters">
            <div className="col-md-4">
            <Image src={comment.avatarUrl} roundedCircle className="commentImage" />
            </div>
              <div className="d-flex justify-content-start">
                <div className="card-body">
                  <h5 className="card-title">{comment.name}</h5>
                  <p className="card-text">{comment.message}</p>
                </div>
              </div>
            </div>
            <div className="d-inline-flex actionList mr-2">
              <p className="card-text"><small className="text-muted"></small></p>
            <div className="editButton">
            { (authData.getUid() === comment.uid) ? <button className="btn btn-outline-primary" id={comment.id} onClick={this.handleShow}>
                                    Edit Comment
                                  </button>
              : <div></div>
            }
            </div>
            </div>
            <EditModal show={this.state.show} comment={comment} handleClose={this.handleClose} singleHoleId={singleHoleId} theCourseId={theCourseId} getCommentsByHoleId={getCommentsByHoleId} />
          </div>
        </div>
    );
  }
}

export default SingleCommentCard;
