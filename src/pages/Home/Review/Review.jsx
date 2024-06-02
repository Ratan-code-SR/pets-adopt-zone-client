
const Review = () => {
    return (
        <div>
           <div className="font-[sans-serif] max-w-[350px] h-auto p-8 rounded-md mx-auto shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] bg-white relative my-12">
            <img src="https://readymadeui.com/profile_2.webp" className="w-14 h-14 rounded-full absolute right-0 left-0 mx-auto -top-7" />
            <div className="mt-8 text-center">
                <p className="text-sm text-[#333] leading-relaxed">The service was amazing. I never had to wait that long for my food. The staff was friendly and attentive, and the delivery was impressively prompt.</p>
                <h4 className="text-base font-extrabold mt-8">( John Doe )</h4>
            </div>
        </div>
        </div>
    );
};

export default Review;