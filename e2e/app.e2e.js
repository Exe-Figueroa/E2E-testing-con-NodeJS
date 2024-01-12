const request = require('supertest'); //Para emular los request a la api
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const obj = { name: 'Facu' }
  res.status(200).json(obj);
});

app.listen(3001, () => {
  console.log('Listen port 3001');
});

const api = request(app);
describe('Tests for app ', () => {
  test('GET /', async () => {
    const response = await api.get('/');

    expect(response.body).toBeTruthy();
    expect(response.body).toEqual({name: 'Facu'});
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
