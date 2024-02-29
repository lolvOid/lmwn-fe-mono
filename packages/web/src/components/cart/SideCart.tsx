import useCartStore from '@/store/cart/cartStore';
import CartItem from '@/components/cart/CartItem';
import { getThaiBaht } from '@/utilts/formatCurrency';
const SideCart = () => {
    const {
        cartData,
        totalCartPrice,
        isCartDisplayed,
        resetCart,
        hideCart,
        removeFromCartById,
        calculateTotalCartPrice,
    } = useCartStore();
    const handleOrder = () => {
        alert('Order Confirmed');
        resetCart();
        calculateTotalCartPrice();
        hideCart();
    };
    const handleRemoveItem = (id: number | string) => {
        removeFromCartById(id);
        calculateTotalCartPrice();
    };
    return (
        <>
            {isCartDisplayed && (
                <div
                    className="fixed w-screen md:lg:w-[400px] bg-white top-16 right-0 z-[500] shadow-md shadow-neutral-300  overflow-y-auto"
                    style={{
                        height: 'calc(100vh - 4rem)',
                    }}
                >
                    <div className="border-2 rounded-md flex m-2 p-3 flex-col h-fit">
                        {cartData.length === 0 && (
                            <span className="text-center">No items to display</span>
                        )}
                        {cartData.length > 0 &&
                            cartData.map((cartItem, index) => {
                                return (
                                    <CartItem
                                        itemData={cartItem}
                                        key={index}
                                        onRemove={handleRemoveItem}
                                    />
                                );
                            })}
                    </div>
                    <div
                        className={`bg-white p-4 bottom-0 right-0 flex flex-col justify-center items-center `}
                    >
                        <div className="inline-flex w-full justify-between py-4">
                            <span className="text-left ">
                                Total <span className="text-xs text-gray-600">(incl VAT):</span>
                            </span>
                            <span className="text-right">{getThaiBaht(totalCartPrice)}</span>
                        </div>
                        <button
                            className="p-4 flex text-center items-center justify-center disabled:bg-gray-300 primary-bg text-white  rounded-lg w-full"
                            onClick={handleOrder}
                            disabled={cartData.length === 0}
                        >
                            Confirm and Place Order
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default SideCart;
