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

  // getSingleCourse = (courseId) => {
  //   coursesData.getSingleCourse(courseId)
  //     .then((course) => {
  //       this.setState({ course: course.data });
  //     })
  //     .catch((errorFromSingleCourse) => (errorFromSingleCourse));
  // }

  getSingleCourse = (courseId) => coursesData.getSingleCourse(courseId)
    .then((courses) => {
      this.setState({ courses: courses.data });
    })
    .catch((errorFromGetSingleCourse) => console.error({ errorFromGetSingleCourse }));

  getHolesByCourseId = (courseId) => holesData.getHolesByCourseId(courseId)
    .then((allHoles) => {
      this.setState({ allHoles });
      console.log(allHoles);
    })
    .catch((errorFromGetHoles) => console.error({ errorFromGetHoles }));

  // getHoles = (courseId) => {
  //   holesData.getHolesByCourseId(courseId)
  //     .then((allHoles) => {
  //       this.setState({ allHoles });
  //       console.log('need it', allHoles);
  //     })
  //     .catch((errorFromGetHoles) => console.error(errorFromGetHoles));
  // }

  componentDidMount() {
    this.getSingleCourse(this.props.match.params.pathId)
      .then(() => {
        this.getHolesByCourseId(this.props.match.params.pathId)
          .then(() => {
            this.getStartingHole();
          });
      });
  }

  getStartingHole = () => {
    const { allHoles } = this.state;
    console.log('demHoles', allHoles);
    const startingHole = this.state.allHoles.find((x) => x.holeNumber === '1');
    this.setState({ startingHole });
    console.log('startingHole', startingHole);
    const startingHoleId = this.state.startingHole.id;
    this.setState({ startingHoleId });
    console.log(startingHoleId);
  }

  render() {
    const { course } = this.state;
    const { allHoles } = this.state;
    const { startingHoleId } = this.state;
    const courseId = this.props.match.params.pathId;
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
                  <Link className="btn btn-outline-primary" to={`/course/${courseId}/${startingHoleId}`}>Hole By Hole
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
