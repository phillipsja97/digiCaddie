import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import holeShape from '../../../Helpers/propz/holeShape';

class SingleHoleCard extends React.Component {
  static propTypes = {
    hole: holeShape.holeShape,
    theCourseId: PropTypes.string,
  }

  state = {
    hole: [],
  }

  render() {
    const { hole } = this.props;
    const { theCourseId } = this.props;
    return (
      <div className="SingleHoleCard">
        <li className="page-item"><Link className="page-link" to={`/course/${theCourseId}/${hole.id}`}>#{hole.holeNumber}</Link></li>
      </div>
    );
  }
}

export default SingleHoleCard;
