import React from 'react';
import { Link } from 'react-router-dom';
import coursesData from '../../../Helpers/data/coursesData';
import './SingleCourse.scss';

class SingleCourse extends React.Component {
  state = {
    course: [],
  }

  getSingleCourse = (courseId) => {
    coursesData.getSingleCourse(courseId)
      .then((course) => {
        this.setState({ course: course.data });
      })
      .catch((errorFromSingleCourse) => (errorFromSingleCourse));
  }

  componentDidMount() {
    this.getSingleCourse(this.props.match.params.pathId);
  }

  render() {
    const { course } = this.state;
    return (
      <div className="SingleCourse">
        <div className="col-6 offset-0 d-flex flex-wrap">
          <h1>{course.name}</h1>
          <img src={course.mapImage} alt={course.address} className="courseImage" />
        </div>
          <div className="col-6 offset-6 d-flex flex-wrap">
            <h1>Course Details:</h1>
          <div className="coureDetails">
            <h3>{course.address}</h3>
            <h3>{course.slope}</h3>
            <h3>{course.yardage}</h3>
            <h3>{course.description}</h3>
            <Link className="btn btn-outline-primary" to={`/course/${course.id}/holes`}>Hole By Hole 
                Caddie Tips</Link>
          </div>
          </div>
    <div className="coursePhotos">
    </div>
    </div>
    );
  }
}

export default SingleCourse;
