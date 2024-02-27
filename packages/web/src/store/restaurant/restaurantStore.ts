import create from 'zustand';

interface RestaurantState {
  name: string;
  id: number | string;
  coverImage: string;
  menus: string[];
  activeTimePeriod: {
    open: string;
    close: string;
  };
  setRestaurant: (restaurant: any) => void;
}

const useRestaurantStore = create<RestaurantState>((set: (arg0: RestaurantState) => any) => ({
  name: '',
  id: 0,
  coverImage: '',
  menus: [],
  activeTimePeriod: {
    open: '',
    close: '',
  },
  setRestaurant: (restaurant: any) => set(restaurant as any),
}));

export default useRestaurantStore;