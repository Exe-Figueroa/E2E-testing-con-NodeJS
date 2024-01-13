const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/seed');

describe('Tests for profile path  ', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(3001);

    api = request(app);
    await upSeed();
  });


  describe('GET /profile/my-user', () => {
    let inputData = null;
    let dataValues = null;
    let bodyLogin = null;

    beforeAll(async () => {
      const response = await models.User.findByPk(1);
      dataValues = response.dataValues;
      inputData = {
        email: 'usuarioRandom@gmail.com',
        password: 'Berenjena123'
      };
      const rtaLogin = await api.post('/api/v1/auth/login').send(inputData);
      bodyLogin = rtaLogin.body
    });

    // Test for /profile/my-user
    test('should retrun a user with a valid access token', async () => {
      // Arrange
      // Act
      const { body, statusCode } = await api.get(`/api/v1/profile/my-user`).set({
        'Authorization': `Bearer ${bodyLogin.access_token}`
      });

      // Assert
      expect(statusCode).toEqual(200);
      // expect(body).toBeTruthy();
      expect(body.email).toBe(dataValues.email)

    });

    test('should retrun a 401 unauthorized', async () => {
      // Arrange

      // Act
      const { body, statusCode } = await api.get(`/api/v1/profile/my-user`).set({
        'Authorization': `Bearer 1234`
      });

      // Assert
      expect(statusCode).toEqual(401);
      expect(body).toBeTruthy();
    });

    afterAll(() => {
      bodyLogin = null
    });

  });

  describe('GET /profile/my-order', () => {
    // Test for /profile/my-order
    test('should retrun a 401 unauthorized', async () => {
      // Arrange

      // Act
      const { body, statusCode } = await api.get(`/api/v1/profile/my-user`).set({
        'Authorization': `Bearer 1234`
      });

      // Assert
      expect(statusCode).toEqual(401);
      expect(body).toBeTruthy();
    });
  });


  afterAll(async () => {
    await downSeed();
    server.close()
  });

});
