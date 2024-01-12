const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');

describe('Tests for app ', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createApp();

    server = app.listen(3001);

    api = request(app);
  });

  test('GET /hi', async () => {
    const response = await api.get('/hi');

    expect(response.body).toBeTruthy();
    expect(response.body).toEqual({ name: 'Facu' });
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  afterAll(() => {
    server.close()
  });
});
