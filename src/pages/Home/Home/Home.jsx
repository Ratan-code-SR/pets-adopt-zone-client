import About from "../About/About";
import Banner from "../Banner/Banner";
import Categories from "../Category/Categories";
import Review from "../Review/Review";

const Home = () => {
    return (
        <div>
            <Banner />
            <Categories/>
            <About/>
            <Review/>
        </div>
    );
};

export default Home;