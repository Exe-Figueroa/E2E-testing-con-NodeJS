const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/seed');


describe('Tests for auth  path  ', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(3001);

    api = request(app);

    await upSeed();
  });



  describe('POST /auth/login', () => { // Test for auth/login
    test('should return 401 Unauthorized', async () => {
      const inputData = {
        email: 'pamela123@gmail.com',
        password: 'lalal'
      };
      const { statusCode } = await api.post('/api/v1/auth/login').send(inputData);

      expect(statusCode).toEqual(401);
      // expect(body.error).toEqual('Bad Request');
      // expect(body.message).toMatch(/password/);

    });

  });

  describe('POST /auth/login', () => { // Test for auth/login
    test('should return 200 and token', async () => {
      const { dataValues } = await models.User.findByPk(1);

      const inputData = {
        email: 'usuarioRandom@gmail.com',
        password: 'Berenjena123'
      };
      const { body, statusCode } = await api.post('/api/v1/auth/login').send(inputData);

      expect(body.access_token).toBeTruthy();
      expect(statusCode).toEqual(200);
      expect(body.user.email).toEqual(dataValues.email);
      expect(body.user.password).toBeUndefined();
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close()
  });
});
