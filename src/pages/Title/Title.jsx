

const Title = ({subHeading,heading}) => {
    return (
        <div className="flex flex-col items-center justify-center">
             <p className="-mb-2 text-red-400">--------------</p>
            <p className="text-sm font-bold text-[#1e4272] ">{subHeading}</p>
            <p className="-mt-2 text-red-400">--------------</p>
            <p className="text-3xl uppercase text-orange-500">{heading}</p>
        </div>
    );
};

export default Title;