import request from 'supertest';
import app from '../src/app';

describe('Test Default Route', () => {
  test('Should return the default response', async () => {
    const res = await request(app).get(`/`);
    expect(res.text).toBe('LINE MAN Wongnai Frontend Assignment');
    expect(res.text).toMatchSnapshot();
  });
});
