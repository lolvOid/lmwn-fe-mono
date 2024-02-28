import { getThaiBaht } from '@/utilts/formatCurrency';
import { getKey } from '@/utilts/generateId';
import { getDiscountedPrice } from '@/utilts/helper';
import { FaPlus } from 'react-icons/fa';
interface ItemCardProps {
    imageSource: string;
    name: string;
    fullPrice: string | number;
    discountedPercent: string;
    totalInStock: number;
    onClick?: () => void;
}

const ItemCard = ({
    name,
    imageSource,
    fullPrice,
    discountedPercent,
    totalInStock,
    onClick,
}: ItemCardProps) => {
    return (
        <div
            className={`relative flex lg:flex-row flex-col lg:justify-between border-solid border-gray-200 border-[0.4px] p-2 rounded-md ${totalInStock != 0 || totalInStock != undefined ? 'opacity-100 cursor-pointer hover:bg-gray-100' : 'opacity-50 cursor-none'}`}
            onClick={() => onClick && onClick()}
        >
            <div className="lg:w-32 w-full max-w-40 h-32 flex-shrink-0 justify-center items-center">
                <img
                    src={
                        imageSource ||
                        'https://dummyimage.com/128x128/dedede/5e5e5e.jpg&text=No+Image+Available'
                    }
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="px-2 py-2 flex lg:flex-col w-full flex-grow lg:items-end items-start">
                <div className="w-full flex flex-col text-sm flex-grow gap-1">
                    <span className="text-xs text-wrap">{name || 'Item'}</span>
                    <span className="text-sm primary-text text-wrap">
                        {discountedPercent
                            ? getThaiBaht(getDiscountedPrice(fullPrice, discountedPercent))
                            : getThaiBaht(fullPrice)}
                    </span>
                    {parseFloat(discountedPercent) !== 0 && (
                        <span className="text-xs text-wrap text-gray-600 line-through">
                            {discountedPercent && getThaiBaht(fullPrice)}
                        </span>
                    )}
                </div>
                <div className="lg:flex hidden">
                    <button
                        className="primary-bg text-sm w-8 h-8 inline-flex items-center justify-center text-white rounded-full hover:bg-yellow-300 hover:animate-pulse"
                        onClick={() => onClick && onClick()}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
            <div className="flex lg:hidden absolute bottom-1 z-[200] right-1">
                <button
                    className="primary-bg text-sm w-8 h-8 inline-flex items-center justify-center text-white rounded-full hover:bg-yellow-300"
                    onClick={() => onClick && onClick()}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default ItemCard;
