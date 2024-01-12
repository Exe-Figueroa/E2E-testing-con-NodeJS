const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');
const { config } = require('../src/config/config');

describe('Tests for app ', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();

    server = app.listen(3001);

    api = request(app);
  });

  describe('Test for /hi path', () => {
    test('should return object in json format', async () => {
      const response = await api.get('/hi');

      expect(response.body).toBeTruthy();
      expect(response.body).toEqual({ name: 'Facu' });
      expect(response.statusCode).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
    });
  });

  describe('GET /nueva-ruta', () => {
    test('Should return 401', async () => {
      const {statusCode} = await api.get('/nueva-ruta');

      expect(statusCode).toEqual(401);
      // expect(headers['api']).toEqual(79823);
    });

    test('Should return 401 with invalid api-key', async () => {
      const {statusCode} = await api.get('/nueva-ruta').set({
        api: '1234'
      });

      expect(statusCode).toEqual(401);
      // expect(headers['api']).toEqual(79823);
    });

    test('Should return 200', async () => {
      const {statusCode} = await api.get('/nueva-ruta').set({
        api: config.apiKey,
      });

      expect(statusCode).toEqual(200);
      // expect(headers['api']).toEqual(79823);
    });
  });

  afterAll(() => {
    server.close()
  });
});
