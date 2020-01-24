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
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-4">{course.name}</h1>
              <p class="lead">{course.description}</p>
          </div>
            <div class="card offset-5 detailsSection">
                    <div class="card-header">Course Details</div>
                      <ul class="list-group list-group-horizontal-xl">
                        <li class="list-group-item">Par: {course.par}</li>
                        <li class="list-group-item">Slope: {course.slope}</li>
                        <li class="list-group-item">{course.yardage}</li>
                      </ul>
                    </div>
                      <div className="singleHoleButton">
                        <Link className="btn btn-outline-primary" to={`/course/${theCourseId}/${startingHoleId}`}>Hole By Hole
                              Caddie Tips
                        </Link>
                      </div>
            </div>
          <div className="container-fluid d-inline-flex flex-wrap detailsSection">
            <div className="col-6">
              <div class="card">
                <img src={course.mapImage} class="card-img-top courseMapImage" alt={course.name} />
                  <div class="card-body">
                    <p class="card-text">{course.address}</p>
                  </div>
              </div>
            </div>
              <div className="col-6 courseCharacteristics">
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
          </div>
      </div>
    );
  }
}

export default SingleCourse;
