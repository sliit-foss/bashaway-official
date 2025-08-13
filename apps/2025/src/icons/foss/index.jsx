import FossDark from './dark';
import FossLight from './light';

const FOSS = ({ dark = false, ...props }) => {
  if (!dark) {
    return <FossLight {...props} />;
  }
  return <FossDark {...props} />;
};

export default FOSS;
