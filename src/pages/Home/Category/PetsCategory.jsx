import PropTypes from 'prop-types';
import { IoLocationOutline } from "react-icons/io5";

const PetsCategory = ({ petsData }) => {
    return (
        <div className="lg:grid grid-cols-3 items-center justify-center gap-5 flex flex-col">
            {
                petsData.map(pet => (<div key={pet._id}>
                    <div className="card card-compact w-96 h-[400px] bg-base-100 shadow-xl">
                        <figure><img className='w-full' src={pet.petImage} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{pet.name}</h2>
                            <div className='flex justify-between items-center'>
                                <p>{pet.age} Year</p>
                                <p className='flex gap-1 items-center'><IoLocationOutline/> {pet.location}</p>
                            </div>
                            <p>{pet.description
                            }</p>
                            <div className="card-actions justify-end">
                                <button className="bg-[#ff9505] text-white p-3 rounded-md w-full">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>))
            }

        </div>
    );
};
PetsCategory.propTypes = {
    petsData: PropTypes.array,
}
export default PetsCategory;