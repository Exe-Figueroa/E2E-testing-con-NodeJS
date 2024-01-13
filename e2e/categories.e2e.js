const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('Test for categories path', () => {
  let app = null;
  let server = null;
  let api = null;
  let accessToken = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(3001);

    api = request(app);
    await upSeed();
  });

  describe('POST /api/v1/categories with customer user', () => {

    beforeAll(async () => {
      const customerUser = await models.User.findByPk(2);
      const customerInputData = {
        email: customerUser.email,
        password: 'Milanesa123'
      };
      const {body: customerLogin} = await api.post('/api/v1/auth/login').send(customerInputData);
      accessToken = customerLogin.access_token
    });

    test('should return a 401 Unauthorized withou token', async () => {
      const inputData = {
        name: 'Nueva categoría',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
      };
      const { statusCode } = await api.post('/api/v1/categories').send(inputData);

      expect(statusCode).toEqual(401);
    });

    test('should return a 401 unauthorized with customer token', async () => {

      const inputData = {
        name: 'Nueva categoría 2',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
      };
      const { statusCode } = await api
      .post('/api/v1/categories')
      .set({'Authorization': `Bearer ${accessToken}`})
      .send(inputData);

      // const categoryCheck = await models.Category.findByPk(body.id);
      expect(statusCode).toEqual(401);
    });

    afterAll(() => {
      accessToken = null;
    });

  });
  describe('POST /api/v1/categories with admin user', () => {

    beforeAll(async () => {
      const adminUser = await models.User.findByPk(1);
      const adminInputData = {
        email: adminUser.email,
        password: 'Berenjena123'
      };
      const {body: adminLogin} = await api.post('/api/v1/auth/login').send(adminInputData);
      accessToken = adminLogin.access_token
    });

    test('should return a 401 Unauthorized', async () => {
      const inputData = {
        name: 'Nueva categoría',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
      };
      const { statusCode } = await api.post('/api/v1/categories').send(inputData);

      expect(statusCode).toEqual(401);
    });

    test('should return a 201 Created', async () => {

      const inputData = {
        name: 'Nueva categoría',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
      };
      const {body, statusCode } = await api
      .post('/api/v1/categories')
      .set({'Authorization': `Bearer ${accessToken}`})
      .send(inputData);

      const categoryCheck = await models.Category.findByPk(body.id);
      // categoryCheck.createdAt = categoryCheck.createdAt.toString();
      expect(statusCode).toEqual(201);
      expect(body.name).toEqual(categoryCheck.name);
      expect(body.id).toEqual(categoryCheck.id);
      expect(body.image).toEqual(categoryCheck.image);
      // expect(body.createAt).toEqual(categoryCheck.createdAt);
      // expect(body).toEqual(categoryCheck);
    });

    afterAll(() => {
      accessToken = null;
    });

  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});

