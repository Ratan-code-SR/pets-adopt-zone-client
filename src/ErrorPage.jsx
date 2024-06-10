import { Link } from 'react-router-dom';
import error from '../src/assets/error/error.jpg'

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center my-10'>
            <img className='w-1/2 mx-auto lg:h-[400px]' src={error} alt="" />
            <Link to='/' className='btn btn-success w-[200px] mx-auto my-2'>GO TO HOME PAGE</Link>
        </div>
    );
};

export default ErrorPage;