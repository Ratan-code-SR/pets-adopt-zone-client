import About from "../About/About";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Categories from "../Category/Categories";
import PromotionBanner from "../PromotionBanner.jsx/PromotionBanner";
import Review from "../Review/Review";
import { BallTriangle } from 'react-loader-spinner'
import useAuth from '../../../Hooks/useAuth';
const Home = () => {
    const { loading } = useAuth();
    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    return (
        <div>
            <Banner />
            <PromotionBanner />
            <Categories />
            <CallToAction />
            <About />
            <Review />
        </div>
    );
};

export default Home;
