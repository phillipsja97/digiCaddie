import React from 'react';
import holesData from '../../../Helpers/data/holesData';
import SingleHoleCard from '../../Shared/SingleHoleCard/SingleHoleCard';
import './SingleHole.scss';

class SingleHole extends React.Component {
  state = {
    course: [],
    holes: [],
    hole: [],
    singleHole: [],
  }

  getHolesByCourseId = (courseId) => {
    holesData.getHolesByCourseId(courseId)
      .then((holes) => {
        console.log(holes);
        this.setState({ holes });
      })
      .catch((errorFromGetHoleByCourseId) => console.error(errorFromGetHoleByCourseId));
  }

  getSingleHole = (singleHoleId) => {
    holesData.getSingleHole(singleHoleId)
      .then((response) => {
        const singleHole = response.data;
        this.setState({ singleHole });
        console.log('singleHole', singleHole);
      })
      .catch((errorFromSingleHole) => console.error(errorFromSingleHole));
  }

  componentDidMount() {
    this.getSingleHole(this.props.match.params.holeId);
    this.getHolesByCourseId(this.props.match.params.courseId);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.holeId !== prevProps.match.params.holeId) {
      this.getSingleHole(this.props.match.params.holeId);
    }
  }

  render() {
    const { holes } = this.state;
    const { singleHole } = this.state;
    const theCourseId = this.props.match.params.courseId;
    const singleHoleId = this.props.match.params.holeId;
    return (
      <div className="SingleHole">
       <h1>Helloooo</h1>
       <nav aria-label="Page navigation example">
          <ul className="pagination">
    { this.state.holes.map((hole) => <SingleHoleCard key={hole.id} hole={hole} courseId={theCourseId} singleHoleId={singleHoleId} />) }
  </ul>
</nav>
      <h1>{singleHole.holeNumber}</h1>
      </div>
    );
  }
}

export default SingleHole;
