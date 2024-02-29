import { SyntheticEvent, Dispatch, SetStateAction } from 'react';

export const getDiscountedPrice = (price: number | string | 0, discount: number | string | 0) => {
    const fullPrice = parseFloat(String(price)) || 0;
    return fullPrice - (fullPrice * parseFloat(String(discount))) / 100;
};

export const handleScroll = (
    event: SyntheticEvent,
    setScrolled: Dispatch<SetStateAction<boolean>>,
) => {
    const currentTarget = event.currentTarget;
    const offset = currentTarget.scrollTop;
    const containerHeight = currentTarget.scrollHeight - currentTarget.clientHeight - 1;

    if (offset >= containerHeight) {
        setScrolled(true);
    } else {
        setScrolled(false);
    }
};
