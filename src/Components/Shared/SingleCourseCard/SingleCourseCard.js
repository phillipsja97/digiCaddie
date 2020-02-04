import React from 'react';
import { Link } from 'react-router-dom';
import './SingleCourseCard.scss';
import courseShape from '../../../Helpers/propz/courseShape';

class SingleCourseCard extends React.Component {
  static propTypes = {
    course: courseShape.courseShape,
  }

  render() {
    const { course } = this.props;
    return (
      <div className="SingleCourseCard">
        <div className="media">
          <img src={course.imageUrl} className="mr-3 courseImage" alt={course.name} />
            <div className="media-body">
              <h2 className="mt-0">{course.name}</h2>
              <h6 className="mt-0">Location: {course.address}</h6>
              <h3 className="courseDetails">Course Details:</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Course Slope Rating: {course.slope}</li>
                <li className="list-group-item">Total Yards: {course.yardage}</li>
                <li className="list-group-item">Par: {course.par}</li>
              </ul>
            </div>
        <div className="d-flex justify-content-end">
         <Link className="btn btn-outline-primary" to={`/course/${course.id}`}>Course Details</Link>
        </div>
      </div>
    </div>
    );
  }
}

export default SingleCourseCard;
