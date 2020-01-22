import React from 'react';
import { Link } from 'react-router-dom';
import './SingleCourseCard.scss';

class SingleCourseCard extends React.Component {
  render() {
    const { course } = this.props;
    return (
      <div className="SingleCourseCard">
        <div className="media">
          <img src={course.imageUrl} className="mr-3 courseImage" alt={course.name} />
            <div className="media-body">
              <h3 className="mt-0">{course.name}</h3>
              <h5 className="mt-0">Location: {course.address}</h5>
              <h5 className="mt-0">Slope: {course.slope}</h5>
              <h5 className="mt-0">Yardage: {course.yardage}</h5>
            </div>
        <div className="d-flex justify-content-end">
         <Link className="btn btn-outline-primary" to={`/course/${course.id}`}>Go To This Course</Link>
        </div>
      </div>
    </div>
    );
  }
}

export default SingleCourseCard;
