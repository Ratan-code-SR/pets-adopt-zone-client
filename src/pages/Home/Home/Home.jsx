import About from "../About/About";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Categories from "../Category/Categories";
import PromotionBanner from "../PromotionBanner.jsx/PromotionBanner";
import Review from "../Review/Review";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useAuth from '../../../Hooks/useAuth';
const Home = () => {
    const { loading } = useAuth();
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen w-full">
                <SkeletonTheme baseColor="#f1eff1" highlightColor="#444">
                    <div className="w-full px-4">
                        <Skeleton height={40} count={1} width="100%" className="mb-4" />
                        <Skeleton height={20} count={10} width="100%" className="mt-4" />
                    </div>
                </SkeletonTheme>
            </div>
        );
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
