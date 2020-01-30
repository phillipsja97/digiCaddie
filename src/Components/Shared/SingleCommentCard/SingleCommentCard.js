import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Image from 'react-bootstrap/image';
import authData from '../../../Helpers/data/authData';
import commentsData from '../../../Helpers/data/commentsData';
import EditModal from '../EditModal/EditModal';
import './SingleCommentCard.scss';

class SingleCommentCard extends React.Component {
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

  dateAndTime = () => {
    const tempDate = new Date();
    const date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
    const currDate = 'Current Date= '+date;
    return (
      <p>{currDate}</p>
    );
  }

  componentDidMount() {
    console.log(this.dateAndDite);
  }

  render() {
    const user = firebase.auth().currentUser;
    const name = user.displayName;
    const photo = user.photoURL;
    const { theCourseId, singleHoleId, comment, getCommentsByHoleId } = this.props;
    return (
        <div className="SingleCommentCard">
         <div className="card col-6 pl-0 pr-0 singleCard">
          <div className="exitButton mx-0">
            <button className="btn btn-danger col-1" onClick={this.deleteCommentEvent}>X</button>
          </div>
          <div className="row no-gutters">
            <div className="col-md-4">
            <Image src={photo} roundedCircle className="commentImage" />
            </div>
              <div className="d-flex justify-content-start">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <p className="card-text">{comment.message}</p>
                </div>
              </div>
            </div>
            <div className="d-inline-flex actionList mr-2">
              <p className="card-text"><small className="text-muted"></small></p>
            <div className="likeSection">
            <button className="likeButton"><img src="https://image.flaticon.com/icons/png/512/81/81250.png" className="likeImage" /></button>
            </div>
            <div className="editButton">
            <button className="btn btn-outline-primary" id={comment.id} onClick={this.handleShow}>
              Edit Comment
            </button>
            </div>
            </div>
            <EditModal show={this.state.show} comment={comment} handleClose={this.handleClose} singleHoleId={singleHoleId} theCourseId={theCourseId} getCommentsByHoleId={getCommentsByHoleId} />
          </div>
        </div>
    );
  }
}

export default SingleCommentCard;
