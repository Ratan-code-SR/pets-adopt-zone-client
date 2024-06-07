import PropTypes from 'prop-types';
const PetsCategory = ({ petsData }) => {
    return (
        <div className="grid grid-cols-3 items-center justify-center gap-5">
            {
                petsData.map(dog => (<div key={dog._id}>
                    <h1>{dog.name}</h1>
                    <h1>hello</h1>
                    <img src={dog.petImage} alt="" />
                </div>))
            }

        </div>
    );
};
PetsCategory.propTypes = {
    petsData: PropTypes.array,
  }
export default PetsCategory;