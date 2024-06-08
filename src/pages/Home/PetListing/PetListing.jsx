
import { IoLocationOutline } from 'react-icons/io5';
import usePets from '../../../Hooks/usePets';
import { Link } from 'react-router-dom';
const PetListing = () => {
    const [pets] = usePets();
    const allPets = pets?.filter(pet => pet.adopted === 'false');
    // Sort the pets by addedDate in descending order
    const sortedPets = allPets?.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    return (
        <div>
            <div className="lg:grid grid-cols-3 items-center justify-center gap-5 flex flex-col">
                {
                    sortedPets.map(pet => (<div key={pet._id}>
                        <div className="card card-compact w-96 h-[400px] bg-base-100 shadow-xl">
                            <figure><img className='w-full' src={pet.petImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{pet.name}</h2>
                                <div className='flex justify-between items-center'>
                                    <p>{pet.age} Year</p>
                                    <p className='flex gap-1 items-center'><IoLocationOutline /> {pet.location}</p>
                                </div>
                                <p>{pet.description
                                }</p>

                                <Link to={`/petsDetails/${pet._id}`}>
                                    <div className="card-actions w-full ">
                                        <button className="bg-[#ff9505] text-white p-3 rounded-md w-full">View Details</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>))
                }

            </div>
        </div>

    );
};

export default PetListing;
