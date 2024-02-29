import { GrCart } from 'react-icons/gr';
import useCartStore from '@/store/cart/cartStore';
import SideCart from '@/components/cart/SideCart';

const CustomNavbar = () => {
    const { totalCartCount, isCartDisplayed, showCart, hideCart } = useCartStore();
    const handleShowCart = () => {
      if (!isCartDisplayed) {
        showCart();
      } else {
        hideCart();
      }
    }
    return (
        <>
            <div className="h-16 primary-bg w-full fixed top-0 left-0 z-[200] inline-flex p-2 items-center justify-between">
                <div className="text-white text-md lg:text-xl font-bold uppercase">
                    Line Man Wongnai Assignment
                </div>
                <div className="inline-flex text-wrap text-white">
                    <ul className="list-none">
                        <li className="list-item">
                            <button className="p-4 relative" onClick={() => {handleShowCart()}}>
                                <GrCart size={18} />
                                <span className="rounded-full bg-lime-200 text-black px-[0.2px] py-[0.1px] text-wrap flex  justify-center items-center min-w-5 min-h-5 absolute top-[5px] right-[5px] text-xs">
                                    {totalCartCount}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            { isCartDisplayed && <SideCart />}
        </>
    );
};

export default CustomNavbar;
