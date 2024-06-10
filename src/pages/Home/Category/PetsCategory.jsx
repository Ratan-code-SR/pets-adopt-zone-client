import PropTypes from 'prop-types';
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const PetsCategory = ({ petsData }) => {
    return (
        <>
            <div className="lg:grid grid-cols-3 items-center justify-center gap-5 flex flex-col">
                {
                    petsData.slice(0,6).map(pet => (<div className='w-full' key={pet._id}>
                        <div className="card card-compact lg:w-96 w-full h-[400px] bg-base-100 shadow-xl">
                            <figure><img className='w-full' src={pet.petImage} alt="Pets" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{pet.name}</h2>
                                <div className='flex justify-between items-center'>
                                    <p>{pet.age} Year</p>
                                    <p className='flex gap-1 items-center'><IoLocationOutline /> {pet.location}</p>
                                </div>
                                <p>{pet.description
                                }</p>
                                <div className="">
                                    <Link to={`/petsDetails/${pet._id}`}>
                                        <button className="bg-[#ff9505] text-white p-3 rounded-md w-full">View Details</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>))
                }
            </div>
            <button className='bg-[#9a9e69] shadow-xl mx-auto text-white p-3 rounded-md  flex justify-center my-5'>
                <Link to={`/petsListing`}>
                    View All Pets</Link>
            </button>
        </>

    );
};
PetsCategory.propTypes = {
    petsData: PropTypes.array,
}
export default PetsCategory;