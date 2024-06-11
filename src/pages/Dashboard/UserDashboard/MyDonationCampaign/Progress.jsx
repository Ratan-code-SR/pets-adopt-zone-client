import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

const Progress = ({ percentage }) => {
    return (
        <div style={{ width: 40, height: 40 }}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
    );
};
Progress.propTypes = {
    percentage: PropTypes.string
};
export default Progress;
