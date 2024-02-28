import { create } from 'zustand';

export type CartDataType = {
    id: number | string;
    name: string | undefined;
    restaurantId: number|string;
    fullPrice: number;
    count: number;
    options: string[],
    thumbnailImage: string | undefined,
};

type CartStore = {
    isCartDisplayed: boolean;
    cartData: CartDataType[];
    totalCartPrice: number;
    totalCartCount: number;
    showCart: () => void;
    hideCart: () => void;
    addToCart: (value: CartDataType) => void;
    resetCart: () => void;
    removeFromCartById:(id: number | string) => void;
    increaseCount: (id: number | string) => void;
    decreaseCount: (id: number | string) => void;
    updateOptions: (id: number | string, options: string[]) => void;
    updateCartCountById: (id: number | string, count: number) => void;
    calculateTotalCartPrice: () => void;
    calculateTotalCartCount: () => void;
};

const useCartStore = create<CartStore>((set) => ({
    isCartDisplayed: false,
    cartData: [],
    totalCartPrice: 0,
    totalCartCount: 0,
    addToCart: (value: CartDataType) => set((state) => {
        const existingItemIndex = state.cartData.findIndex((item) => item.id === value.id);
        if (existingItemIndex !== -1) {
            const updatedCartData = state.cartData.map((item, index) => {
                if (index === existingItemIndex) {
                    return {
                        ...item,
                        name: item.name,
                        count: item.count + value.count,
                        options: [...item.options, ...value.options],
                        fullPrice: item.fullPrice,
                        thumbnailImage: item.thumbnailImage,
                    };
                }
                return item;
            });
            return { ...state, cartData: updatedCartData };
        } else {
            return { ...state, cartData: [...state.cartData, value] };
        }
    }),
    increaseCount: (id: number | string) => set((state) => {
        const cartItemIndex = state.cartData.findIndex((item) => item.id === id);
        if (cartItemIndex !== -1) {
            const updatedCartData = state.cartData.map((item, index) => {
                if (index === cartItemIndex) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
            return { ...state, cartData: updatedCartData };
        }
        return state;
    }),
    decreaseCount: (id: number | string) => set((state) => {
        const cartItemIndex = state.cartData.findIndex((item) => item.id === id);
        if (cartItemIndex !== -1) {
            const updatedCartData = state.cartData.map((item, index) => {
                if (index === cartItemIndex) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
            return { ...state, cartData: updatedCartData };
        }
        return state;
    }),
    updateOptions: (id: number | string, options: string[]) => set((state) => {
        const cartItemIndex = state.cartData.findIndex((item) => item.id === id);
        if (cartItemIndex !== -1) {
            const updatedCartData = state.cartData.map((item, index) => {
                if (index === cartItemIndex) {
                    return { ...item, options };
                }
                return item;
            });
            return { ...state, cartData: updatedCartData };
        }
        return state;
    }),
    removeFromCartById: (id: number | string) => set((state) => ({
        ...state,
        cartData: state.cartData.filter((item) => item.id !== id),
    })),
    showCart: () => set({ isCartDisplayed: true }),
    hideCart: () => set({ isCartDisplayed: false }),
    updateCartCountById: (id: number | string, count: number) => set((state) => {
        const cartItemIndex = state.cartData.findIndex((item) => item.id === id);
        if (cartItemIndex !== -1) {
            const updatedCartData = state.cartData.map((item, index) => {
                if (index === cartItemIndex) {
                    return { ...item, count: count };
                }
                return item;
            });
            return { ...state, cartData: updatedCartData };
        }
        return state;
    }),
    resetCart: () => set({ cartData: [] }),
    calculateTotalCartPrice: () => set((state) => {
        const VAT = 7;
        const totalCartPriceWithoutVAT = state.cartData.reduce((total, item) => total + (item.fullPrice * item.count), 0);
        const VATAmount = (VAT / 100) * totalCartPriceWithoutVAT;
        const totalCartPrice = totalCartPriceWithoutVAT + VATAmount;
        return { ...state, totalCartPrice };
    }),
    calculateTotalCartCount: () => set((state) => {
        const totalCartCount = state.cartData.reduce((totalCount, item) => totalCount + item.count, 0);
        return { ...state, totalCartCount };
    }),

}));

export default useCartStore;