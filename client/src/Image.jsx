import PropTypes from 'prop-types';

function Image({ src, ...rest }) {
  // console.log(src);
  
  src = src && src.includes('https://')
    ? src
    : 'https://bookyourplace.onrender.com/uploads/' + src;

  return <img {...rest} src={src} alt="" />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
