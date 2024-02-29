import { getThaiBaht } from '@/utilts/formatCurrency';
import { GrTrash } from 'react-icons/gr';
import { CartDataType } from '../../types/cartTypes';

interface CartItemProps {
    itemData: CartDataType;
    onRemove?: (id: number | string) => void;
}
const CartItem = ({ itemData, onRemove }: CartItemProps) => {
    return (
        <>
            <div className="flex justify-between p-2 flex-col">
                <div className="flex">
                    <img
                        src={
                            itemData.thumbnailImage ||
                            'https://dummyimage.com/128x128/dedede/5e5e5e.jpg&text=No+Image+Available'
                        }
                        className="w-16 h-16 object-cover object-center flex-shrink-0"
                        alt={itemData.name || 'Item'}
                    />
                    <span className="primary-text text-xl ml-3">{itemData.name}</span>
                    <span className="text-md ml-3">
                        {getThaiBaht(itemData.fullPrice * itemData.count)}
                    </span>
                </div>
                {itemData.options.length > 0 && (
                    <>
                        <div className="flex justify-between">
                            <span className="mx-auto  text-center w-16 text-xs">
                                {itemData.count}
                            </span>
                            <div className="flex flex-col flex-grow px-3 text-wrap">
                                <span className="text-xs text-gray-500 flex flex-col">
                                    {itemData.options.map((option, index) => {
                                        return <span key={index}>{option}</span>;
                                    })}
                                </span>
                            </div>
                        </div>
                    </>
                )}
                <button
                    className="border-2 border-gray-400  text-gray-400 p-2 mt-2 rounded-md hover:bg-gray-400 hover:text-white transition-all inline-flex items-center justify-center"
                    onClick={() => {
                        onRemove && onRemove(itemData.id);
                    }}
                >
                    <GrTrash className="mr-2" />
                    Remove
                </button>
            </div>
        </>
    );
};

export default CartItem;
