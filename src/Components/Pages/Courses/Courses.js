import React from 'react';
import coursesData from '../../../Helpers/data/coursesData';
import SingleCourseCard from '../../Shared/SingleCourseCard/SingleCourseCard';
import './Courses.scss';

class Courses extends React.Component {
  state = {
    courses: [],
  }

  getAllCourses = () => {
    coursesData.getAllCourses()
      .then((courses) => {
        this.setState({ courses });
      })
      .catch((errorFromGetCourses) => console.error(errorFromGetCourses));
  }

  componentDidMount() {
    this.getAllCourses();
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="courses">
        <h1 className="courseTitle">Find Courses</h1>
          <div className="container courseContainer">
            { this.state.courses.map((course) => <SingleCourseCard key={course.id} course={course} />)}
          </div>
      </div>
    );
  }
}

export default Courses;
