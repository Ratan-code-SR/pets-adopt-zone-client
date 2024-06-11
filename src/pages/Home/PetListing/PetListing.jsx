
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
const PetListing = () => {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const {loading} = useAuth()
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchPets = async () => {
            const res = await axiosPublic.get('/searchPets', {
                params: { q: searchQuery, category: selectedCategory }
            });
            setPets(res.data);
        };

        fetchPets();
    }, [searchQuery, selectedCategory, axiosPublic]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                    <div className="w-full px-4">
                        <Skeleton height={40} count={1} />
                        <Skeleton height={20} count={10} className="mt-4" />
                    </div>
                </SkeletonTheme>
            </div>
        );
    }

    return (
        <div className='px-2 w-full'>
            <h1 className='text-center text-2xl my-5 text-orange-400'>View All Pets</h1>
            <div className="search-bar w-full mb-5 flex px-2 justify-between items-center">
                <input type="text"
                 placeholder="Search by pet name" 
                 value={searchQuery}
                 onChange={handleSearch}
                 className="input input-bordered input-accent w-full max-w-xs" 
                 />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="select select-bordered"
                >
                    <option value="All">All Categories</option>
                    <option value="cat">Cats</option>
                    <option value="dog">Dogs</option>
                    <option value="rabbit">Rabbits</option>
                </select>
            </div>
            <div className="grid lg:grid-cols-3  sm:grid-cols-2 items-center justify-center gap-5">
                {Array.isArray(pets) && pets.map(pet => (
                    <div key={pet._id} className="card card-compact w-full h-[400px] bg-base-100 shadow-xl">
                        <figure>
                            <img className='w-full' src={pet.petImage} alt={pet.name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{pet.name}</h2>
                            <div className='flex justify-between items-center'>
                                <p>{pet.age} Year</p>
                                <p className='flex gap-1 items-center'><IoLocationOutline /> {pet.location}</p>
                            </div>
                            <p>{pet.description}</p>
                            <Link to={`/petsDetails/${pet._id}`}>
                                <div className="card-actions w-full">
                                    <button className="bg-[#ff9505] text-white p-3 rounded-md w-full">View Details</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {
                searchQuery && <p className='text-2xl font-bold text-center my-10'>Not Found</p>
            }
        </div>
    );
};

export default PetListing;

