import { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import Title from '../../Title/Title';
const Review = () => {
    const [reviews, setReviews] = useState([])
    const axiosPublic = useAxiosPublic()
    useEffect(() => {
        const reviewData = async () => {
            const res = await axiosPublic.get('/reviews')
            setReviews(res.data)
        }
        reviewData()
    }, [axiosPublic])
    return (
        <div>
            <Title heading='What Say Our Users'></Title>
            <Swiper
                slidesPerView={1} 
                spaceBetween={2}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: { 
                        slidesPerView: 1,
                    },
                    768: { 
                        slidesPerView: 2,
                    },
                    1024: { 
                        slidesPerView: 3,
                    },
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review._id}>

                        <div className="font-[sans-serif] max-w-[350px] h-auto p-8 rounded-md mx-auto shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] bg-white relative my-12">
                            <img src="https://readymadeui.com/profile_2.webp" className="w-14 h-14 rounded-full absolute right-0 left-0 mx-auto -top-7" />
                            <div className="mt-8 text-center">
                                <p className="text-sm text-[#333] leading-relaxed">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                                <h4 className="text-base font-extrabold mt-8">( John Doe )</h4>
                            </div>
                        </div>
                    </SwiperSlide>)
                }


            </Swiper>

        </div>
    );
};

export default Review;