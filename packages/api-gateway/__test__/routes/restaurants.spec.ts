import request from 'supertest';
import app from '../../src/app';
import { Restaurant } from '../../../web/src/types/restaurant';
import { FullMenu, Menu } from '../../../web/src/types/menu';

const restaurantId = 227018;
const invalidRestaurantId = 999999; // Use an invalid ID for testing 404
const menuName = 'Peach and Blueberry Crumble Cheesecake';

describe('Test Restaurants and Menu routes', () => {
  test('Should return the specific restaurant', async () => {
    const res = await request(app).get(`/restaurants/${restaurantId}`);
    const restaurantResponse = res.body as Restaurant;
    expect(restaurantResponse.name).toBe('Ekkamai Macchiato - Home Brewer');
    expect(restaurantResponse).toMatchSnapshot();
  });

  test('Should return short menu data', async () => {
    const res = await request(app).get(`/restaurants/${restaurantId}/menu/${menuName}`);
    const shortMenuResponse = res.body as Menu;
    expect(shortMenuResponse).toMatchSnapshot();
  });

  test('Should return full menu data', async () => {
    const res = await request(app).get(`/restaurants/${restaurantId}/menu/${menuName}?type=full`);
    const fullMenuResponse = res.body as FullMenu;
    expect(fullMenuResponse).toMatchSnapshot();
  });

  test('Should return 404 for invalid restaurant ID', async () => {
    const invalidRes = await request(app).get(`/restaurants/${invalidRestaurantId}`);
    expect(invalidRes.status).toBe(404);
  });

  test('Should return 404 for invalid menu name', async () => {
    const invalidRes = await request(app).get(`/restaurants/${restaurantId}/menu/invalidMenuName`);
    expect(invalidRes.status).toBe(404);
  });

  test('Should return 404 for invalid restaurant ID and menu name (full menu)', async () => {
    const invalidRes = await request(app).get(`/restaurants/${invalidRestaurantId}/menu/invalidMenuName?type=full`);
    expect(invalidRes.status).toBe(404);
  });
});
