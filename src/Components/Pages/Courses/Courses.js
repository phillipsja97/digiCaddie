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
    const { filteredCourses, searchedCourse, courses} = this.state;
    const input = e.target.value.toLowerCase();
    const newCourseList = this.state.courses.filter((course) => course.name.toLowerCase().search(input) !== -1);
    this.setState({ courses: newCourseList });
    console.log(courses, 'newState');
  }

  componentDidMount() {
    this.getAllCourses();
  }

  componentDidUpdate(prevState) {
    console.log(prevState.courses);
    console.log(this.state.courses);
    if (this.state.courses !== prevState.courses && prevState.courses !== undefined) {
      console.log('in the if statement')
    }
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="courses">
        <h1 className="courseTitle">Find Courses</h1>
          <div className="container courseContainer">
            <div className="d-flex justify-content-center searchBar">
              <InputGroup className="mb-3 col-6">
                <FormControl
                  placeholder="search by city"
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
