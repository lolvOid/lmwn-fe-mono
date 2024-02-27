import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseAPIURL } from '../constants';

const useRestaurantQuery = (restaurantId: string) => {
    return useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(
                `${baseAPIURL}/restaurants/${restaurantId}?item=${pageParam}`,
            );
            return data;
        },
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.menus.length === 10) {
                return pages.length + 1;
            }
            return undefined;
        },
        initialPageParam: 1, // Add initialPageParam property with initial value
    });
};

export default useRestaurantQuery;
