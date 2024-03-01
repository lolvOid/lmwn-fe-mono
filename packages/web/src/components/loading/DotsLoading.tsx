import { PiDotsThreeOutline } from 'react-icons/pi';
const DotsLoading = () => {
    return (
        <>
            <div className="w-full h-16 flex justify-center items-center">
                <div className="px-3 py-1 text-4xl text-yellow-300 font-bold leading-3 text-center animate-pulse">
                    <PiDotsThreeOutline />
                </div>
            </div>
        </>
    );
};

export default DotsLoading;
