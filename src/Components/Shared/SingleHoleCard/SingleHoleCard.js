import React from 'react';
import { Link } from 'react-router-dom';
import holesData from '../../../Helpers/data/holesData';

class SingleHoleCard extends React.Component {
  state = {
    hole: [],
  }

  render() {
    const { hole } = this.props;
    const { theCourseId } = this.props;
    return (
      <div className="SingleHoleCard">
        <li className="page-item"><Link className="page-link" to={`/course/${theCourseId}/${hole.id}`}>{hole.holeNumber}</Link></li>
      </div>
    );
  }
}

export default SingleHoleCard;
