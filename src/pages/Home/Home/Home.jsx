
import About from "../About/About";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Categories from "../Category/Categories";
import PromotionBanner from "../PromotionBanner.jsx/PromotionBanner";
import Review from "../Review/Review";

const Home = () => {
    return (
        <div>
            <Banner />
            <PromotionBanner/>
            <Categories />
            <CallToAction />
            <About />
            <Review />
        </div>
    );
};

export default Home;