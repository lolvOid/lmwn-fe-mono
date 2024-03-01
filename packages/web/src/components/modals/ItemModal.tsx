import { useEffect, useState, Fragment, BaseSyntheticEvent } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import useModalStore from '@/store/modal/modalStore';
import useFullMenuItemQuery from '@/services/queries/menu.query';
import { FullMenu } from '@/interfaces/menu';
import { getThaiBaht } from '@/utils/formatCurrency';
import { getDiscountedPrice } from '@/utils/helper';
import useCartStore from '@/store/cart/cartStore';
import styles from '@/components/modals/ItemModal.module.scss';
import { CartDataType } from '@/store/types/cartTypes';
interface ItemModalProps {
    restaurantId: number | string;
}

const ItemModal = ({ restaurantId }: ItemModalProps) => {
    const { show, modalData, hideModal, resetModalData } = useModalStore();
    const [cartCount, setCartCount] = useState(1);
    const [selectedOptions, setOptions] = useState<string[]>([]);
    const { cartData, addToCart, calculateTotalCartPrice, calculateTotalCartCount } =
        useCartStore();
    const { data, isLoading, isError } = useFullMenuItemQuery(
        modalData?.restaurantId || '',
        modalData?.menuName || '',
        'full',
    );
    const [itemData, setItemData] = useState<FullMenu>();
    const handleAddToCart = (value: CartDataType) => {
        addToCart(value);
        hideModal();
        calculateTotalCartPrice();
        calculateTotalCartCount();
    };
    const handleIncreaseCartCount = () => {
        setCartCount(cartCount + 1);
    };

    const handleReduceCartCount = () => {
        if (cartCount <= 1) {
            setCartCount(1);
        } else {
            setCartCount(cartCount - 1);
        }
    };
    const handleOptions = (event: BaseSyntheticEvent) => {
        const selectedValue = event.target?.value || '';
        const isValueSelected = selectedOptions.includes(selectedValue);
        if (isValueSelected) {
            const updatedOptions: string[] = selectedOptions.filter(
                (option) => option !== selectedValue,
            );
            setOptions(updatedOptions);
        } else {
            const updatedOptions: string[] = [...selectedOptions, selectedValue];
            setOptions(updatedOptions);
        }
    };
    useEffect(() => {
        if (show) {
            if (isError) {
                console.error('Error fetching menu data:', isError);
            }

            if (!isLoading && data) {
                setItemData(data);
            }
        }
    }, [show, isLoading, isError, data, cartData]);
    return (
        <>
            {show && itemData && Object.keys(itemData).length && (
                <div
                    className={`fixed top-0 left-0 w-screen h-screen z-[1000]  bg-opacity-60 bg-black ${styles.itemModal}`}
                >
                    <div className="w-full h-full flex justify-center items-end lg:items-center">
                        <div
                            className={`relative rounded-t-2xl lg:rounded-lg shadow-md shadow-gray-400 flex flex-col z-[2000] lg:w-[600px] h-[80vh] lg:max-h-[1024px] w-full overflow-y-auto max-w-screen-2xl max-h-svh bg-white ${styles.itemModalContent}`}
                        >
                            <div className="w-full rounded-t-2xl lg:rounded-t-lg">
                                {!itemData?.largeImage && (
                                    <div
                                        role="status"
                                        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                                    >
                                        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-t-2xl lg:rounded-t-lg">
                                            <svg
                                                className="w-full h-[250px] text-gray-200"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                {itemData?.largeImage && (
                                    <img
                                        src={itemData?.largeImage}
                                        className="object-cover w-full h-[250px] rounded-t-2xl lg:rounded-t-lg"
                                        alt={itemData.name}
                                    />
                                )}
                            </div>
                            <button
                                data-testid="close-button"
                                className="w-auto h-auto p-4 absolute top-1 right-1 hover:bg-white hover:bg-opacity-50 rounded-full"
                                onClick={() => {
                                    hideModal();
                                    resetModalData();
                                }}
                            >
                                <GrClose size={24} />
                            </button>
                            <div className="flex flex-col gap-2 flex-grow p-4 relative">
                                <div className="border-b-2 h-fit py-4 items-end inline-flex z-10 bg-white w-full justify-between sticky top-0">
                                    <span
                                        className="text-xl font-bold pr-4"
                                        data-testid="item-name"
                                    >
                                        {itemData.name}
                                    </span>
                                    <span className="inline text-2xl font-light">
                                        <span>
                                            {itemData.discountedPercent
                                                ? getThaiBaht(
                                                      getDiscountedPrice(
                                                          itemData.fullPrice,
                                                          itemData.discountedPercent,
                                                      ),
                                                  )
                                                : getThaiBaht(itemData.fullPrice)}
                                        </span>
                                        <span className="pl-2 text-xl text-gray-500 line-through">
                                            {itemData.discountedPercent !== 0 &&
                                                getThaiBaht(itemData.fullPrice)}
                                        </span>
                                    </span>
                                </div>
                                <div className="mt-4 h-fit py-2 flex flex-col w-full justify-between">
                                    {itemData.options?.length > 0 &&
                                        itemData.options.map((option, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <span className="text-md font-bold my-3">
                                                        {option.label}
                                                    </span>
                                                    <span className="flex flex-col gap-2 text-sm">
                                                        {option.choices?.length &&
                                                            option.choices.map((choice, index) => {
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        className={`inline-flex gap-2 items-center ${styles.choicesCheckbox}`}
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            name={option.label}
                                                                            id={choice.label}
                                                                            value={choice.label}
                                                                            onChange={handleOptions}
                                                                        />
                                                                        <label
                                                                            htmlFor={choice.label}
                                                                            className="text-md"
                                                                        >
                                                                            {choice.label}
                                                                        </label>
                                                                    </div>
                                                                );
                                                            })}
                                                    </span>
                                                </Fragment>
                                            );
                                        })}
                                </div>
                            </div>
                            <div className="flex p-4 border-t-2 gap-8 items-center justify-between sticky bottom-0 left-0 w-full bg-white">
                                <div className="flex">
                                    <button
                                        className="primary-bg text-sm w-8 h-8 inline-flex items-center justify-center text-white rounded-l-md hover:bg-yellow-500"
                                        onClick={() => handleReduceCartCount()}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="w-8 h-8 inline-flex text-md items-center justify-center border-y-2 border-yellow-300 border-solid">
                                        {cartCount}
                                    </span>
                                    <button
                                        className="primary-bg text-sm w-8 h-8 inline-flex items-center justify-center text-white rounded-r-md rounded-l-none rounded-md hover:bg-yellow-500"
                                        onClick={() => handleIncreaseCartCount()}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="flex-grow">
                                    <button
                                        disabled={
                                            itemData.options.length > 0 &&
                                            selectedOptions.length === 0
                                        }
                                        data-testid="add-to-cart-button"
                                        className="primary-bg text-md w-full h-10 inline-flex items-center disabled:bg-gray-300 justify-center text-white rounded-md hover:bg-yellow-500"
                                        onClick={() =>
                                            handleAddToCart({
                                                id: itemData.id,
                                                name: itemData.name,
                                                count: cartCount,
                                                restaurantId: restaurantId,
                                                fullPrice: itemData.fullPrice,
                                                options: selectedOptions,
                                                thumbnailImage: itemData.thumbnailImage,
                                            })
                                        }
                                    >
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ItemModal;
