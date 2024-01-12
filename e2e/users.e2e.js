const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');

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

  describe('POST /users', () => {
    // Test for /users
    test('should return 400 bad request with password invaid', async () => {
      // arrange
      const inputData = {
        email: 'pamela123@gmail.com',
        password: 'lalal'
      };
      // act
      const {body, statusCode} = await api.post('/api/v1/users').send(inputData);
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
      const {body, statusCode} = await api.post('/api/v1/users').send(inputData);
      // assert
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual('Bad Request');
      expect(body.message).toMatch(/email/);

    });

  });

  describe('PATCH /users', () => {
    // Test for /users
  });

  describe('DELETE /users', () => {
    // Test for /users
  });

  afterEach(() => {
    server.close()
  });
});
