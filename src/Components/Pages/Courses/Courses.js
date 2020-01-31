/* eslint-disable max-len */
import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import coursesData from '../../../Helpers/data/coursesData';
import SingleCourseCard from '../../Shared/SingleCourseCard/SingleCourseCard';
import './Courses.scss';

class Courses extends React.Component {
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
        <h1 className="courseTitle">Find Courses</h1>
          <div className="container courseContainer">
            <div className="d-flex justify-content-center searchBar">
              <InputGroup className="mb-3 col-6">
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
