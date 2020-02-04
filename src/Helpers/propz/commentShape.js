import PropTypes from 'prop-types';

const commentShape = PropTypes.shape({
  holeId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export default { commentShape };
