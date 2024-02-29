import { Menu } from '@/interfaces/menu';

export type PageData = {
    pageParams?: number[];
    pages: {
        id: string;
        menus: Menu[];
    }[];
};
