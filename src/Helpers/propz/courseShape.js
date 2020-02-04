import PropTypes from 'prop-types';

const courseShape = PropTypes.shape({
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  slope: PropTypes.string.isRequired,
  yardage: PropTypes.string.isRequired,
  par: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageUrl1: PropTypes.string.isRequired,
  imageUrl2: PropTypes.string.isRequired,
  imageUrl3: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mapImage: PropTypes.string.isRequired,
});

export default { courseShape };
