
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../../../assets/slider/slider1.jpg'
import slide2 from '../../../assets/slider/slider2.jpg'
import slide3 from '../../../assets/slider/slider3.jpg'
import slide4 from '../../../assets/slider/slider4.jpg'
import slide5 from '../../../assets/slider/slider5.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay,  } from 'swiper/modules';

const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay,]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='w-full h-[250px]' src={slide1} alt="" />
                </SwiperSlide>
                <SwiperSlide className='w-full h-[400px]'>
                    <img className='w-full h-[250px]' src={slide2} alt="" />
                </SwiperSlide>
                <SwiperSlide className='w-full h-[400px]'>
                    <img className='w-full h-[250px]' src={slide3} alt="" />
                </SwiperSlide>
                <SwiperSlide className='w-full h-[400px]'>
                    <img className='w-full h-[250px]' src={slide4} alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img className='w-full h-[250px]' src={slide5} alt="" />
                </SwiperSlide>
               
            </Swiper>
        </>
    );
};

export default Banner;
