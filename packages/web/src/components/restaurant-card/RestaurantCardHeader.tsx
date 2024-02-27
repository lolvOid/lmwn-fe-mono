type RestaurantCardHeaderProps = {
    name: string;
    openTime: string;
    closeTime: string;
};

const RestaurantCardHeader = ({ name, openTime, closeTime }: RestaurantCardHeaderProps) => {
    return (
        <div className="bg-black text-white lg:max-w-[600px] my-0 mx-auto w-full px-8 py-4 sticky top-16 rounded-t-2xl mt-4 z-[400] flex flex-col">
            <span className="text-lg">{name || 'Restaurant Name'}</span>
            <span className="text-sm text-yellow-300 line">
                Open {openTime || '00:00'} - Close {closeTime || '00:00'}
            </span>
        </div>
    );
};

export default RestaurantCardHeader;
