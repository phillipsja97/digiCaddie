import React from 'react';
import holesData from '../../../Helpers/data/holesData';
import coursesData from '../../../Helpers/data/coursesData';
import SingleHoleCard from '../../Shared/SingleHoleCard/SingleHoleCard';
import './SingleHole.scss';

class SingleHole extends React.Component {
  state = {
    course: [],
    holes: [],
    hole: [],
    singleHole: [],
  }

  getSingleCourse = (courseId) => {
    coursesData.getSingleCourse(courseId)
      .then((course) => {
        this.setState({ course: course.data });
        console.log('singleCourse', course);
      })
      .catch((errorFromGetSingleCourse) => console.error(errorFromGetSingleCourse));
  }

  getHolesByCourseId = (courseId) => {
    holesData.getHolesByCourseId(courseId)
      .then((holes) => {
        console.log(holes);
        this.setState({ holes });
      })
      .catch((errorFromGetHoleByCourseId) => console.error(errorFromGetHoleByCourseId));
  }

  getSingleHole = (singleHoleId) => {
    holesData.getSingleHole(singleHoleId)
      .then((response) => {
        const singleHole = response.data;
        this.setState({ singleHole });
        console.log('singleHole', singleHole);
      })
      .catch((errorFromSingleHole) => console.error(errorFromSingleHole));
  }

  componentDidMount() {
    this.getSingleHole(this.props.match.params.holeId);
    this.getHolesByCourseId(this.props.match.params.courseId);
    this.getSingleCourse(this.props.match.params.courseId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.holeId !== prevProps.match.params.holeId) {
      this.getSingleHole(this.props.match.params.holeId);
    }
  }

  render() {
    const { holes } = this.state;
    const { course } = this.state;
    const { singleHole } = this.state;
    const theCourseId = this.props.match.params.courseId;
    const singleHoleId = this.props.match.params.holeId;
    return (
      <div className="SingleHole">
        <div className="d-flex justify-content-center pageNation">
          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-lg">
              { this.state.holes.map((hole) => <SingleHoleCard key={hole.id} hole={hole} theCourseId={theCourseId} singleHoleId={singleHoleId} />) }
            </ul>
          </nav>
        </div>
          <h1>{course.name}, Hole #{singleHole.holeNumber}</h1>
          <div className="container-fluid d-inline-flex detailsSection">
            <div className="col-6 holeImageLocation">
              <img src={singleHole.holeImageUrl} className="holeImage" />
            </div>
            <div className="col-6 inset-1 holeDetails">
              <h3>Par: {singleHole.par}</h3>
              <h3>Hole Handicap: {singleHole.handicap}</h3>
              <h3>Yards to Pin: {singleHole.yardage}</h3>
            </div>
          </div>
      </div>
    );
  }
}

export default SingleHole;
