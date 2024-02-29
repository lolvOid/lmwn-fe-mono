export const getDiscountedPrice = (price: number | string | 0, discount: number | string | 0) => {
    const fullPrice = parseFloat(String(price)) || 0;
    return fullPrice - (fullPrice * parseFloat(String(discount))) / 100;
};
