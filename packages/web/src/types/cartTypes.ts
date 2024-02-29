export type CartDataType = {
    id: number | string;
    name: string | undefined;
    restaurantId: number | string;
    fullPrice: number;
    count: number;
    options: string[];
    thumbnailImage: string | undefined;
};

export type CartStore = {
    isCartDisplayed: boolean;
    cartData: CartDataType[];
    totalCartPrice: number;
    totalCartCount: number;
    showCart: () => void;
    hideCart: () => void;
    addToCart: (value: CartDataType) => void;
    resetCart: () => void;
    removeFromCartById: (id: number | string) => void;
    increaseCount: (id: number | string) => void;
    decreaseCount: (id: number | string) => void;
    updateOptions: (id: number | string, options: string[]) => void;
    updateCartCountById: (id: number | string, count: number) => void;
    calculateTotalCartPrice: () => void;
    calculateTotalCartCount: () => void;
};
