import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = () => {
    const percentage = 66;

    return (
        <div style={{ width: 40, height: 40 }}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
    );
};

export default Progress;
