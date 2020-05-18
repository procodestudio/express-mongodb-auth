import request from 'supertest';
import App from '../../src/app';

describe('User', () => {
  it('should have a route to it', async () => {
    await request(App)
      .get('/user')
      .expect(200);
  });
});
