import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseAPIURL } from "../constants";

const useFullMenuItemQuery = (restaurantId: string, menuName: string) => {
  return useQuery({
    queryKey: ["fullMenu", menuName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${baseAPIURL}/restaurants/${restaurantId}/menu/${menuName}`
      );
      return data;
    },
  });
};

export default useFullMenuItemQuery;
