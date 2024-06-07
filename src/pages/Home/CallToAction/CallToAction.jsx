import cta1 from '../../../assets/CTA/cta1.webp'
import cta2 from '../../../assets/CTA/cta2.webp'
import cta3 from '../../../assets/CTA/cta3.webp'
import cta4 from '../../../assets/CTA/cta4.webp'
import Title from '../../../pages/Title/Title'
const CallToAction = () => {
    return (
        <>
        <Title heading={`Adopt, Don't Shop`} subHeading={'Give a Better Life'}/>
            <div className='md:flex  justify-center items-center gap-4 my-5'>
                
                <div className='w-1/2'>
                    <section className="grid grid-cols-2 items-center justify-center gap-5">
                        <img src={cta1} alt="" />
                        <img src={cta4} alt="" />
                        <img src={cta3} alt="" />
                        <img src={cta2} alt="" />
                    </section>
                </div>
                <div className='w-1/2'>
                    <h1 className='lg:text-5xl font-bold'>Give a Pet a Loving Home</h1>
                    <p className='lg:text-xl mt-10'>Every pet deserves a loving family and a safe home. By adopting a pet, you not only save a life but also enrich your own with companionship and unconditional love. Help us give these animals a second chance and a forever home—adopt a pet today!</p>
                    <button className='btn btn-success mt-5'>adoppted now</button>
                </div>
            </div>
        </>
    );
};

export default CallToAction;