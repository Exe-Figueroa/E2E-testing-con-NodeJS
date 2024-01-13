const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');


describe('Tests for users path  ', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();

    server = app.listen(3001);

    api = request(app);
  });


  describe('GET /users', () => {
    // Test for /users

  });
  describe('GET /users/{id}', () => {
    // Test for /user/id
    test('should retrun a user', async () => {
      // Arrange
      const userId = 1;
      const { dataValues } = await models.User.findByPk(userId);

      // Act
      const { body, statusCode } = await api.get(`/api/v1/users/${userId}`);

      // Assert
      expect(statusCode).toEqual(200);
      expect(body).toBeTruthy();
      // expect({...body}).toEqual({...dataValues}); // Este falla porque el created at del body lo devuelve como string y el de sequelize es devuelto como un número

      expect(body.id).toEqual(dataValues.id);
      expect(body.email).toEqual(dataValues.email);
      expect(body.password).toEqual(dataValues.password);
      expect(body.role).toEqual(dataValues.role);
      expect(body.id).toEqual(userId);
    });

  });

  describe('POST /users', () => {
    // Test for /users
    test('should return 400 bad request with password invaid', async () => {
      // arrange
      const inputData = {
        email: 'pamela123@gmail.com',
        password: 'lalal'
      };
      // act
      const { body, statusCode } = await api.post('/api/v1/users').send(inputData);
      // assert
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual('Bad Request');
      expect(body.message).toMatch(/password/);

    });

    test('should return 400 bad request with email invalid', async () => {
      // arrange
      const inputData = {
        email: 'BadMail',
        password: 'correctPassword'
      };
      // act
      const { body, statusCode } = await api.post('/api/v1/users').send(inputData);
      // assert
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual('Bad Request');
      expect(body.message).toMatch(/email/);

    });
    // TODO: with valid data
    test('should return 201 success', async () => {
      // arrange
      const inputData = {
        email: 'userraro@gmail.com',
        password: '12345678'
      };
      // act
      const { body, statusCode } = await api.post('/api/v1/users').send(inputData);
      // assert
      expect(statusCode).toEqual(201);
      // check db
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      expect(user.role).toEqual('admin');
      expect(user.email).toEqual(inputData.email);
    });

  });


  describe('PATCH /users', () => {
    // Test for /users
  });

  describe('DELETE /users', () => {
    // Test for /users
  });

  afterAll(() => {
    server.close()
  });

});
