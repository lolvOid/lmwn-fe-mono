import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/common/constants';
import { Request, Response } from 'express';
import { MenuCache, RestaurantCache } from '@/services/CacheService';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const handleError = (res: Response, error: any) => {
  const status = error.response ? error.response.status : 500;
  return res.status(status).send(error.message);
};

const cacheKey = (restaurantId: string, item?: number, menuName?: string) => {
  if (menuName) return `${restaurantId}/${menuName}`;
  if (item !== undefined) return `${restaurantId}?${item}`;
  return `${restaurantId}`;
};

const fetchMenuItems = async (restaurantId: string, items: number): Promise<any[]> => {
  try {
    const response = await api.get(`/api/restaurants/${restaurantId}.json`);
    const menuPromises = response.data.menus.slice((items - 1) * 10, (items - 1) * 10 + 10).map((menu: any) =>
      api
        .get(`/api/restaurants/${restaurantId}/menus/${menu}/short.json`)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error)),
    );

    return Promise.all(menuPromises);
  } catch (error) {
    return Promise.reject(error);
  }
};

const processMenuResult = (response: any, menuResult: any[], restaurantId: string): any => {
  if (menuResult.length > 0) {
    const sortMenu = menuResult.sort((a: any, b: any) => b.sold - a.sold);
    if (RestaurantCache.has('popular')) {
      const temp: any = RestaurantCache.get('popular');
      if (sortMenu[0].sold > temp.sold) RestaurantCache.set('popular', sortMenu[0]);
    } else RestaurantCache.set('popular', sortMenu[0]);
  }

  const data = {
    ...response.data,
    menus: menuResult,
  };

  return data;
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId: string = req.params.restaurantId;
    const item: number = Number(req.query.item) || 0;
    const cacheKeyValue = cacheKey(restaurantId, item);

    if (RestaurantCache.has(cacheKeyValue)) {
      const data = RestaurantCache.get(cacheKeyValue);
      return res.status(200).json(data);
    }

    const menuResult = await fetchMenuItems(restaurantId, item);

    if (menuResult.length < 10) RestaurantCache.set('all', true);

    const response = await api.get(`/api/restaurants/${restaurantId}.json`);
    const data = processMenuResult(response, menuResult, restaurantId);

    RestaurantCache.set(cacheKeyValue, data);
    return res.status(200).json(data);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getMenuByName = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuName } = req.params;
    const { type } = req.query;
    const menuTypes = ['short', 'full'];
    const menuType = typeof type === 'string' && menuTypes.includes(type) ? type : 'short';

    const menu = await api.get(`/api/restaurants/${restaurantId}/menus/${menuName}/${menuType}.json`);
    return res.status(200).send(menu.data);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getFullMenuByNameAndRestaurantId = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuName } = req.params;
    const cacheKeyValue = cacheKey(restaurantId, undefined, menuName);

    if (MenuCache.has(cacheKeyValue)) {
      const data: any = MenuCache.get(cacheKeyValue);
      if (RestaurantCache.has('all')) data.popular = RestaurantCache.get('popular');
      return res.status(200).json(data);
    }

    const response = await api.get(`/api/restaurants/${restaurantId}/menus/${menuName}/full.json`);
    const data = {
      ...response.data,
      popular: '',
    };

    if (RestaurantCache.has('all')) {
      data.popular = RestaurantCache.get('popular');
      return res.status(200).json(data);
    }

    MenuCache.set(cacheKeyValue, data);
    return res.status(200).json(data);
  } catch (error) {
    return handleError(res, error);
  }
};
