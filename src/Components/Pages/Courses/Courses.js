/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import coursesData from '../../../Helpers/data/coursesData';
import SingleCourseCard from '../../Shared/SingleCourseCard/SingleCourseCard';
import courseShape from '../../../Helpers/propz/courseShape';
import './Courses.scss';

class Courses extends React.Component {
  static propTypes = {
    courses: courseShape.courseShape,
    filterCourses: PropTypes.func,
  }

  state = {
    courses: [],
    filteredCourses: [],
    searchedCourse: '',
  }

  getAllCourses = () => {
    coursesData.getAllCourses()
      .then((courses) => {
        this.setState({ courses });
      })
      .catch((errorFromGetCourses) => console.error(errorFromGetCourses));
  }

  filterCourses = (e) => {
    const input = e.target.value.toLowerCase();
    if (e.target.value !== '') {
      const newCourses = [];
      const newCourseList = this.state.courses.filter((course) => course.name.toLowerCase().search(input) !== -1);
      newCourses.push(newCourseList);
      this.setState({ courses: newCourseList });
    } else {
      this.getAllCourses();
    }
  }

  componentDidMount() {
    this.getAllCourses();
  }

  render() {
    return (
      <div className="courses">
        <div class="jumbotron jumbotron-fluid courseJumbo">
          <div class="container">
            <h1 class="display-4">Find Courses</h1>
          </div>
        </div>
          <div className="container courseContainer">
            <div className="d-flex justify-content-center searchBar">
              <InputGroup className="mb-3 col-6 searchBar">
                <FormControl
                  placeholder="search by course name..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={this.searchedCourse}
                  onChange={this.filterCourses}
                />
                  <InputGroup.Append>
                    <Button className="btn btn-primary">Search</Button>
                  </InputGroup.Append>
              </InputGroup>
            </div>
            { this.state.courses.map((course) => <SingleCourseCard key={course.id} course={course} />)}
          </div>
      </div>
    );
  }
}

export default Courses;
