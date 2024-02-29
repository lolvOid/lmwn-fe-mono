import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseAPIURL } from "@/services/constants";


/**
 * Custom React query hook for fetching the full menu of a restaurant.
 *
 * @param {string} restaurantId - The ID of the restaurant
 * @param {string} menuName - The name of the menu
 * @param {string} menuType - The type of the menu
 * @return {QueryResult} The result of the query
 */
const useFullMenuItemQuery = (restaurantId: string, menuName: string, menuType?: string|'short') => {
  return useQuery({
    queryKey: ["fullMenu", menuName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseAPIURL}/restaurants/${restaurantId}/menu/${menuName}?type=${menuType}`
      );
      return data;
    },
  });
};

export default useFullMenuItemQuery;
