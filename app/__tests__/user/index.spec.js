import request from 'supertest';
import faker from 'faker';
import jwt from 'jsonwebtoken';
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
        });
    });
  });

  describe('Auth', () => {
    it('should not authenticate when credentials are missing', async () => {
      await request(App)
        .post('/user/auth')
        .send({ })
        .expect(500);
    });

    it('should not authenticate when user email credential is wrong', async () => {
      const userObj = {
        email: 'Wrong username',
        password: 'Wrong password',
      };

      await request(App)
        .post('/user/auth')
        .send({
          email: userObj.email,
          password: userObj.password,
        })
        .expect(401);
    });

    it('should not authenticate when password is wrong', async () => {
      const userObj = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      await request(App)
        .post('/user/register')
        .send(userObj)
        .expect(200);

      await request(App)
        .post('/user/auth')
        .send({
          email: userObj.email,
          password: 'Wrong password',
        })
        .expect(401);
    });

    it('should authenticate and receive an access token', async () => {
      const userObj = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      await request(App)
        .post('/user/register')
        .send(userObj)
        .expect(200);

      await request(App)
        .post('/user/auth')
        .send({
          email: userObj.email,
          password: userObj.password,
        })
        .expect(200)
        .then(({ headers }) => {
          expect(headers).toHaveProperty('content-token');

          const token = headers['content-token'];
          const parsedToken = jwt.verify(token, process.env.APP_SECRET);

          expect(parsedToken).toHaveProperty('id');
        });
    });
  });
});
