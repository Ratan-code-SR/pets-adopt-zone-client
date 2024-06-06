import Title from "../../Title/Title";

const About = () => {
    return (
        <div className="my-10">
              <Title heading={`About ____ Us`} subHeading={'Give a Better Life'}/>
            <div className="font-sans text-[#333] mt-2  mx-auto">
                <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6">
                    <div className="max-md:order-1 max-md:text-center z-50 relative">
                        <h2 className="lg:text-6xl md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[56px]">
                           About __
                        </h2>
                        <p className="mt-6 text-base ">
                        Welcome to our Pet Adoption Platform, where we connect loving homes with adorable pets in need. Join us in our mission to give every pet a second chance at happiness.
                        </p>
                        <button className="btn">
                            Get Started
                        </button>
                        <div className="mt-10">
                            <div className="grid sm:grid-cols-3 gap-4 items-center">
                                <div className="flex flex-col items-center text-center">
                                    <h5 className="font-bold text-xl mb-1">10+</h5>
                                    <p>Years Experience</p>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <h5 className="font-bold text-xl mb-1">890</h5>
                                    <p>Cases Solved</p>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <h5 className="font-bold text-xl mb-1">250</h5>
                                    <p>Business Partners</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className=" flex items-center relative max-md:before:hidden before:absolute before:bg-[#DEE2E5]  ">
                        <img src="https://i.ibb.co/2MdVVFP/family-adopt-dog-6c2f1eedd593433f85549e94e07af8bf.jpg" className="rounded-md  relative" alt="Dining Experience" />
                    </div>
                </div>
                
            </div>

        </div>
    );
};

export default About;