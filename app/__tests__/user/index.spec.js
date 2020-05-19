import request from 'supertest';
import faker from 'faker';
import App from '../../src/app';

describe('User component', () => {
  it('should have a route to it', async () => {
    await request(App)
      .get('/user')
      .expect(200);
  });

  describe('Register', () => {
    it('should not create a new user if data is missing', async () => {
      await request(App)
        .post('/user/register')
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
        })
        .catch(({ body }) => {
          expect(typeof body).toBe('object');
          expect(body).toHaveProperty('error');
        });
    });

    it('should create a new user when data fits criteria', async () => {
      const userObj = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      await request(App)
        .post('/user/register')
        .send(userObj)
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe('object');
          expect(body).toHaveProperty('email');
          expect(body).toMatchObject(userObj);
        });
    });
  });
});
