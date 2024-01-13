const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

// Mocking de nodemailer
const mockSendMail = jest.fn();
jest.mock('nodemailer', ()=>({
  createTransport: jest.fn().mockImplementation(()=>({
    sendMail: mockSendMail,
  }))
}))

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

  describe('POST /recovery (Mock service)', () => {
    beforeAll(() => {
      mockSendMail.mockClear(); //Buena práctica para limpiar el mock y evitar comportamientos indeseados
    });

    test('should return 401', async () => {
      const inputData = {
        email: 'noexisto@gmail.com',
      };

      const{statusCode}= await api.post('/api/v1/auth/recovery').send(inputData);

      expect(statusCode).toEqual(401);

    });

    test('should send mail', async () => {
      const user = await models.User.findByPk('1');

      const inputData = {
        email: user.email,
      };
      console.log({mockSendMail});
      mockSendMail.mockResolvedValue(true);
      const{statusCode, body}= await api.post('/api/v1/auth/recovery').send(inputData);

      expect(statusCode).toEqual(200);
      expect(body.message).toEqual('mail sent');
      expect(mockSendMail).toHaveBeenCalled();

    });
  });

  afterAll(async () => {
    await downSeed();
    server.close()
  });
});
