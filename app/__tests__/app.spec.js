import request from 'supertest';
import App from '../src/app';

describe('App', () => {
  it('should run with no errors', async () => {
    await request(App)
      .get('/')
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty('health', 'ok');
      });
  });
});
