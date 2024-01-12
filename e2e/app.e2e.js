const request = require('supertest'); //Para emular los request a la api
const express = require('express');


describe('Tests for app ', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = express();

    app.get('/', (req, res) => {
      const obj = { name: 'Facu' }
      res.status(200).json(obj);
    });

    server = app.listen(3001);

    api = request(app);
  });

  test('GET /', async () => {
    const response = await api.get('/');

    expect(response.body).toBeTruthy();
    expect(response.body).toEqual({ name: 'Facu' });
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  afterEach(() => {
    server.close()
  });
});
