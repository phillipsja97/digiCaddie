import PropTypes from 'prop-types';

const scoreShape = PropTypes.shape({
  score: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
});

export default { scoreShape };
