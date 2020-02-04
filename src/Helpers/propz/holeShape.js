import PropTypes from 'prop-types';

const holeShape = PropTypes.shape({
  courseId: PropTypes.string.isRequired,
  yardage: PropTypes.string.isRequired,
  handicap: PropTypes.string.isRequired,
  holeNumber: PropTypes.string.isRequired,
  holeImageUrl: PropTypes.string.isRequired,
  par: PropTypes.string.isRequired,
});

export default { holeShape };
