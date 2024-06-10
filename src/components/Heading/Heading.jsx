import PropTypes from 'prop-types';

const Heading = ({heading}) => {
    return (
        <div>
            <p className='lg:w-[60%] w-[90%] text-center mx-auto'>{heading}</p>
        </div>
    );
};
Heading.propTypes = {
    heading: PropTypes.string.isRequired
};
export default Heading;