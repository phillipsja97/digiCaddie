import React from 'react';
import Image from 'react-bootstrap/Image';
import holesData from '../../../Helpers/data/holesData';
import coursesData from '../../../Helpers/data/coursesData';
import SingleHoleCard from '../../Shared/SingleHoleCard/SingleHoleCard';
import './SingleHole.scss';
import commentsData from '../../../Helpers/data/commentsData';
import SingleCommentCard from '../../Shared/SingleCommentCard/SingleCommentCard';
import AddModal from '../../Shared/AddModal/AddModal';

class SingleHole extends React.Component {
  state = {
    authed: true,
    course: [],
    holes: [],
    hole: [],
    singleHole: [],
    comments: [],
    show: false,
  }

handleClose = () => this.setState({ show: false });

handleNewCommentShow = () => this.setState({ show: true });

  getSingleCourse = (courseId) => {
    coursesData.getSingleCourse(courseId)
      .then((course) => {
        this.setState({ course: course.data });
      })
      .catch((errorFromGetSingleCourse) => console.error(errorFromGetSingleCourse));
  }

  getHolesByCourseId = (courseId) => {
    holesData.getHolesByCourseId(courseId)
      .then((holes) => {
        this.setState({ holes });
      })
      .catch((errorFromGetHoleByCourseId) => console.error(errorFromGetHoleByCourseId));
  }

  getSingleHole = (singleHoleId) => {
    holesData.getSingleHole(singleHoleId)
      .then((response) => {
        const singleHole = response.data;
        this.setState({ singleHole });
      })
      .catch((errorFromSingleHole) => console.error(errorFromSingleHole));
  }

  getCommentsByHoleId = (holeId) => {
    commentsData.getCommentsByHoleId(holeId)
      .then((comments) => {
        this.setState({ comments });
      })
      .catch((errorFromGetComments) => console.error(errorFromGetComments));
  }

  componentDidMount() {
    this.getSingleHole(this.props.match.params.holeId);
    this.getHolesByCourseId(this.props.match.params.courseId);
    this.getSingleCourse(this.props.match.params.courseId);
    this.getCommentsByHoleId(this.props.match.params.holeId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.holeId !== prevProps.match.params.holeId) {
      this.getSingleHole(this.props.match.params.holeId);
      this.getCommentsByHoleId(this.props.match.params.holeId);
    }
    if (this.state.comment !== prevState.comment) {
      this.getCommentsByHoleId(this.props.match.params.holeId);
    }
  }

  deleteComment = (commentId) => {
    commentsData.deleteAComment(commentId)
      .then(() => {
        this.getCommentsByHoleId(this.props.match.params.holeId);
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { holes } = this.state;
    const { course } = this.state;
    const { singleHole } = this.state;
    const { comments } = this.state;
    const { deleteComment, authed } = this.props;
    const theCourseId = this.props.match.params.courseId;
    const singleHoleId = this.props.match.params.holeId;
    return (
      <div className="SingleHole">
                <div className="jumbotron jumbotron-fluid">
                  <div className="d-flex justify-content-center pageNation">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination pagination-lg">
                        { this.state.holes.map((hole) => <SingleHoleCard key={hole.id} hole={hole} theCourseId={theCourseId} singleHoleId={singleHoleId} authed={this.authed} />) }
                      </ul>
                    </nav>
                  </div>
                  <div className="container">
                    <h1>{course.name}, Hole #{singleHole.holeNumber}</h1>
                  </div>
                </div>
          <div className="container-fluid d-inline-flex detailsSection">
            <div className="col-6 holeImageLocation">
            <Image src={singleHole.holeImageUrl} fluid className="holeImage" />
            </div>
            <div className="col-6 holeDetails">
              <div className="card">
                <div className="card-header">Hole Details:</div>
                      <ul className="list-group list-group-xl">
                        <li className="list-group-item">Par: {singleHole.par}</li>
                        <li className="list-group-item">Handicap: {singleHole.handicap}</li>
                        <li className="list-group-item">Yards To Pin: {singleHole.yardage}</li>
                      </ul>
              </div>
            </div>
          </div>
          <div className="jumbotron jumbotron-fluid caddieJumbotron">
            <h1>Caddie Tips:</h1>
          <button className="btn btn-outline-primary" onClick={this.handleNewCommentShow}>
              Add Comment
          </button>
          </div>
          <AddModal show={this.state.show} handleClose={this.handleClose} singleHoleId={singleHoleId} theCourseId={theCourseId} getCommentsByHoleId={this.getCommentsByHoleId} />
          <div className="commentCard">
           { this.state.comments.map((comment) => <SingleCommentCard key={comment.id} comment={comment} deleteComment={this.deleteComment} theCourseId={theCourseId} singleHoleId={singleHoleId} authed={this.authed} getCommentsByHoleId={this.getCommentsByHoleId} show={this.state.show} handleClose={this.handleClose} />)}
          </div>
      </div>
    );
  }
}

export default SingleHole;
