import { PageData } from '@/types/PageData';
import { SyntheticEvent } from 'react';

export type RestaurantContainerProps = {
    pageData: PageData;
    name: string;
    openTime: string;
    closeTime: string;
    restaurantImage: string;
    isLoading?: boolean;
    onLayoutScroll: (event: SyntheticEvent) => void;
};
