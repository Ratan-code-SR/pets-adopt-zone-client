import Title from "../../Title/Title";

const About = () => {
    return (
        <div className="my-10">
              <Title heading={`About __ Us`} />
            <div className=" mt-2  mx-auto">
                <div className="lg:grid md:grid-cols-2  gap-6 flex flex-col">
                    <div className="ml-2 lg:text-2xl max-md:text-center z-50 relative">
                        <p className="mt-6">
                      <span className="lg:text-3xl font-bold">Welcome</span> to our <span className="font-bold text-orange-400">Pet Adoption</span>   Platform, <br /> where we connect loving homes with adorable pets in need. Join us in our mission to give every pet a second chance at happiness.
                       </p>
                        <button className="p-2 text-[15px]  my-5 text-white rounded-md bg-[#ff9505]">
                            Get Started
                        </button>
                        <div className="mt-10">
                            <div className="grid grid-cols-2 gap-4 items-center">
                                <div className="flex flex-col items-center text-center border-2 border-[#afb286] rounded-md p-5">
                                    <h5 className="font-bold text-xl mb-1">890+</h5>
                                    <p>All Pets</p>
                                </div>
                                <div className="flex flex-col items-center text-center border-2 border-[#afb286] p-5 rounded-md">
                                    <h5 className="font-bold text-xl mb-1">250+</h5>
                                    <p>All Campaign</p>
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