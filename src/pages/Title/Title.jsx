import PropTypes from 'prop-types';

const Title = ({heading}) => {
    return (
        <div className="flex flex-col items-center justify-center my-5">
            <p className="text-3xl text-orange-500">{heading}</p>
            <p className="border-2 border-[#afb286] w-[150px] my-2"></p>
        </div>
    );
};
Title.propTypes = {
    heading: PropTypes.string.isRequired
};
export default Title;