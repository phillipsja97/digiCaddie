import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import coursesData from '../../../Helpers/data/coursesData';
import holesData from '../../../Helpers/data/holesData';
import './SingleCourse.scss';

class SingleCourse extends React.Component {
  state = {
    course: [],
    allHoles: [],
    startingHole: [],
    startingHoleId: [],
  }

  getSingleCourse = (courseId) => coursesData.getSingleCourse(courseId)
    .then((course) => {
      this.setState({ course: course.data });
    })
    .catch((errorFromGetSingleCourse) => console.error({ errorFromGetSingleCourse }));

  getHolesByCourseId = (courseId) => holesData.getHolesByCourseId(courseId)
    .then((allHoles) => {
      this.setState({ allHoles });
    })
    .catch((errorFromGetHoles) => console.error({ errorFromGetHoles }));

  componentDidMount() {
    this.getSingleCourse(this.props.match.params.courseId)
      .then(() => {
        this.getHolesByCourseId(this.props.match.params.courseId)
          .then(() => {
            this.getStartingHole();
          });
      });
  }

  getStartingHole = () => {
    const { allHoles } = this.state;
    const startingHole = this.state.allHoles.find((x) => x.holeNumber === '1');
    this.setState({ startingHole });
    const startingHoleId = this.state.startingHole.id;
    this.setState({ startingHoleId });
  }

  render() {
    const { course } = this.state;
    const { allHoles } = this.state;
    const { startingHoleId } = this.state;
    const theCourseId = this.props.match.params.courseId;
    return (
      <div className="SingleCourse">
        <h1 className="d-flex justify-content-center courseTitle">{course.name}</h1>
          <div className="container-fluid d-inline-flex detailsSection">
            <div className="col-6">
              <img src={course.mapImage} alt={course.address} className="courseMapImage" />
              <h5>Address:  {course.address}</h5>
            </div>
              <div className="col-6 courseCharacteristics">
                <h2>Course Details:</h2>
                  <h5>Slope:  {course.slope}</h5>
                  <h5>Course Yardage:  {course.yardage}</h5>
                  <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${startingHoleId}`}>Hole By Hole
                          Caddie Tips
                  </Link>
              </div>
          </div>
                  <div className="descriptionSection">
                    <h3>{course.description}</h3>
                  </div>
                      <div className="coursePhotos">
                      <Carousel>
                          <Carousel.Item>
                            <img
                              className="d-block w-100 carouselPhoto"
                              src={course.imageUrl}
                              alt="First slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100 carouselPhoto"
                              src={course.imageUrl1}
                              alt="Second slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100 carouselPhoto"
                              src={course.imageUrl2}
                              alt="Third slide"
                            />
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100 carouselPhoto"
                              src={course.imageUrl3}
                              alt="Fourth slide"
                            />
                          </Carousel.Item>
                        </Carousel>
                      </div>
      </div>
    );
  }
}

export default SingleCourse;
