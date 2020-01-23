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
              <h2 className="mt-0">{course.name}</h2>
              <h7 className="mt-0">Location: {course.address}</h7>
              <h3 className="courseDetails">Course Details:</h3>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Course Slope Rating: {course.slope}</li>
                <li class="list-group-item">Total Yards: {course.yardage}</li>
                <li class="list-group-item">Par: {course.par}</li>
              </ul>
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
