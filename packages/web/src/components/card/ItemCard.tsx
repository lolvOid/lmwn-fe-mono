import { FaMinus, FaPlus } from 'react-icons/fa';
interface ItemCardProps {
    id: string;
    imageSource: string;
    name: string;
    fullPrice: string;
    discountedPercent: string;
    dataKey: string;
    totalInStock: number;
    onClick?: () => void;
    onRemove?: (value: any) => void;
    onAdd?: (value: any) => void;
}

const ItemCard = ({
    id,
    name,
    imageSource,
    fullPrice,
    discountedPercent,
    totalInStock,
    dataKey,
    onClick,
    onRemove,
    onAdd,
}: ItemCardProps) => {
    return (
        <div
            key={dataKey}
            className={`relative flex lg:flex-row flex-col justify-between border-solid border-gray-200 border-[0.4px] p-2 rounded-md ${totalInStock != 0 || totalInStock != undefined ? 'opacity-100 cursor-pointer hover:bg-gray-100' : 'opacity-50 cursor-none'}`}
            onClick={() => onClick && onClick()}
        >
            <div className="w-full h-full">
                <img src={imageSource || 'https://dummyimage.com/128x128/dedede/5e5e5e.jpg&text=No+Image+Available'} className="object-cover max-w-32  w-32  h-32" />
            </div>
            <div className="px-2 py-2 flex lg:flex-col lg:items-end items-start">
                <div className="flex flex-col text-sm flex-grow gap-1">
                    <span className="text-xs text-wrap">{name || 'Item'}</span>
                    <span className="text-sm text-yellow-400 text-wrap">
                        ฿{fullPrice || '฿500'}
                    </span>
                    {parseFloat(discountedPercent) !== 0 && (
                        <span className="text-xs text-wrap text-gray-600 line-through">
                            ฿{`${discountedPercent} : ''`}{' '}
                        </span>
                    )}
                </div>
                <div className="flex">
                    <button
                        className="bg-yellow-400 text-sm w-8 h-8 lg:inline-flex items-center justify-center text-white rounded-l-md hidden hover:bg-yellow-300"
                        onClick={() => onRemove && onRemove(id)}
                    >
                        <FaMinus />
                    </button>
                    <span className="w-8 h-8  lg:inline-flex hidden text-sm items-center justify-center border-t-[0.2px] border-b-[0.2px] border-yellow-400 border-solid">
                        1
                    </span>
                    <button
                        className="bg-yellow-400 text-sm w-8 h-8 inline-flex items-center justify-center text-white rounded-r-md lg:rounded-l-none rounded-md hover:bg-yellow-300"
                        onClick={() => onAdd && onAdd(id)}
                    >
                        <FaPlus />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
