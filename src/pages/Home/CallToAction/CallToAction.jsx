import cta1 from '../../../assets/CTA/cta1.webp'
import cta2 from '../../../assets/CTA/cta2.webp'
import cta3 from '../../../assets/CTA/cta3.webp'
import cta4 from '../../../assets/CTA/cta4.webp'
import Title from '../../../pages/Title/Title'
const CallToAction = () => {
    return (
        <>
        <Title heading={`Adopt, Don't Shop`} subHeading={'Give a Better Life'}/>
            <div className='lg:flex px-2 justify-center  gap-10 my-5 grid '>
                
                <div className='lg:w-1/2 w-full'>
                    <section className="grid grid-cols-2 items-center justify-center gap-5">
                        <img className='rounded-md' src={cta1} alt="" />
                        <img className='rounded-md' src={cta4} alt="" />
                        <img className='rounded-md' src={cta3} alt="" />
                        <img className='rounded-md' src={cta2} alt="" />
                    </section>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <h1 className='lg:text-3xl font-bold lg:mt-5'>Give a Pet a Loving Home</h1>
                    <p className='lg:text-2xl mt-5'> <span className=''>Every</span> <span className='text-orange-400  text-xl font-bold'>Pet</span> deserves a loving family and a safe home. By adopting a pet, you not only save a life but also enrich your own with companionship and unconditional love. Help us give these animals a second chance and a forever home—adopt a pet today!</p>
                    <button className="p-2 lg:mt-10 lg:my-5 mt-2 text-white rounded-md bg-[#ff9505]">Adopted now</button>
                </div>
            </div>
        </>
    );
};

export default CallToAction;