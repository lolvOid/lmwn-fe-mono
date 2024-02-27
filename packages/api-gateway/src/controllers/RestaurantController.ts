import axios from 'axios';
import { API_BASE_URL } from '../common/constants';
import { Request, Response } from 'express';
import MenuCache from '../cache/MenuCache';
import RestaurantCache from '../cache/RestaurantCache';

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId: string = req.params.restaurantId;
    const item: number = Number(req.query.item) || 0;
    
    if (RestaurantCache.has(`${restaurantId}?${item}`)) {
      const data = RestaurantCache.get(`${restaurantId}?${item}`);
      return res.status(200).json(data);
    }
    const response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}.json`);
    
    const promise = response.data.menus.slice((item - 1) * 10, (item - 1) * 10 + 10).map(async (menu: any) => {
      try {
        let response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/menus/${menu}/short.json`);
        return response.data;
      } catch (err) {
        const error = err as Error;
        return res.status(400).send(error.message);
      }
    });
    const menuResult = await Promise.all(promise);
    if (menuResult.length < 10) RestaurantCache.set('isGetAll', true);

    if (menuResult.length > 0) {
      const sortMenu = menuResult.sort((a: any, b: any) => {
        return b.sold - a.sold;
      });
      if (RestaurantCache.has('popular')) {
        const temp: any = RestaurantCache.get('popular');
        if (sortMenu[0].sold > temp.sold) RestaurantCache.set('popular', sortMenu[0]);
      } else RestaurantCache.set('popular', sortMenu[0]);
    }

    const data = {
      ...response.data,
      menus: menuResult,
    };

    RestaurantCache.set(`${restaurantId}?${item}`, data);

    return res.status(200).json(data);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Request failed with status code 404') return res.status(404).send(error.message);
    return res.status(400).send(error.message);
  }
};

export const getMenuByName = async (req: Request, res: Response) => {
  const { restaurantId, menuName } = req.params;
  const { type } = req.query;
  const menuTypes = ['short', 'full'];
  const menuType = typeof type === 'string' && menuTypes.includes(type) ? type : 'short';
  try {
    const menu = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/menus/${menuName}/${menuType}.json`);
    return res.status(200).send(menu.data);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const getFullMenuByNameAndRestaurantId = async (req: Request, res: Response) => {
  try {
    const { restaurantId, menuName } = req.params;
    if (MenuCache.has(`${restaurantId}/${menuName}`)) {
      const data: any = MenuCache.get(`${restaurantId}/${menuName}`);
      if (RestaurantCache.has('isGetAll')) data.popular = RestaurantCache.get('popular');
      return res.status(200).json(data);
    }
    const response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/menus/${menuName}/full.json`);
    const data = {
      ...response.data,
      popular: '',
    };
    if (RestaurantCache.has('isGetAll')) {
      data.popular = RestaurantCache.get('popular');
      return res.status(200).json(data);
    }
    MenuCache.set(`${restaurantId}/${menuName}`, data);
    return res.status(200).json(data);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Request failed with status code 404') return res.status(404).send(error.message);
    return res.status(400).send(error.message);
  }
};
