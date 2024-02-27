import create from 'zustand';

interface ShortMenuState {
  name: string;
  id: string;
  thumbnailImage?: string;
  fullPrice: number;
  discountedPercent: number;
  discountedTimePeriod?: {
    begin: string;
    end: string;
  };
  sold: number;
  totalInStock: number;
}

interface ShortMenuStore {
  shortMenus: ShortMenuState[];
  setShortMenus: (menus: ShortMenuState[]) => void;
}

const useShortMenuStore = create<ShortMenuStore>((set) => ({
  shortMenus: [],
  setShortMenus: (menus) => set({ shortMenus: menus }),
}));

export default useShortMenuStore;
