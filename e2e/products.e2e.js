const request = require('supertest'); //Para emular los request a la api

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('Tests for products  path  ', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(async () => {
    app = createApp();

    server = app.listen(3001);

    api = request(app);

    await upSeed();
  });

  describe('GET /products', () => {
    test('should retrun product list', async () => {
      // Arrange
      const productList = await models.Product.findAll();

      // Act
      const { statusCode, body } = await api.get('/api/v1/products');

      // Assert
      expect(statusCode).toEqual(200);
      expect(body.length).toEqual(productList.length);
    });
  });

  describe('GET /products', () => {
    test('should retrun n products list with limit and offset', async () => {
      const limit = 2
      const offset = 0

      const productList = await models.Product.findAll();

      const { statusCode, body } = await api.get(`/api/v1/products?limit=${limit}&offset=${offset}`);

      expect(statusCode).toEqual(200);
      expect(body.length).toEqual(2);
      //Validamos el primero producto
      expect(body[0].id).toEqual(productList[0].id);
      expect(body[0].name).toEqual(productList[0].name);
      expect(body[0].categoryId).toEqual(productList[0].categoryId);
      //Validamos el segundo producto
      expect(body[1].id).toEqual(productList[1].id);
      expect(body[1].name).toEqual(productList[1].name);
      expect(body[1].categoryId).toEqual(productList[1].categoryId);
      //Validamos que no exista ninguno en el index 2
      expect(body[2]).toBeUndefined();
    });
  });

  describe('GET /products/{id}', () => {
    test('should retrun a product', async () => {
      // Arrange
      const productId = 1;
      const product = await models.Product.findByPk(productId);
      const categoryProduct = await models.Category.findByPk(product.categoryId);
      // Act
      const { statusCode, body } = await api.get(`/api/v1/products/${productId}`);
      // Assert
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(product.id);
      expect(body.price).toEqual(product.price);
      expect(body.description).toEqual(product.description);
      expect(body.name).toEqual(product.name);
      expect(body.image).toEqual(product.image);
      expect(body.categoryId).toEqual(product.categoryId);
      expect(body.category.id).toEqual(categoryProduct.id);
      expect(body.category.name).toEqual(categoryProduct.name);
    });
  });

  describe('POST /products', () => {
    test('should return 400 name length and image required', async () => {
      const newProduct = {
        name: 'Test product name',
        description: 'Product description',
        categoryId: 3,
        price: 500
      }

      const { statusCode, body } = await api.post('/api/v1/products').send(newProduct);
      expect(statusCode).toEqual(400);
      expect(body.message).toMatch(/is required/);
      expect(body.message).toMatch(/image/);
      expect(body.message).toMatch(/name/);
    });

    test('should return 201', async () => {
      const newProduct = {
        name: 'Correct name',
        description: 'Product description',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        categoryId: 3,
        price: 500
      }

      const { statusCode, body } = await api.post('/api/v1/products').send(newProduct);
      const checkProduct = await models.Product.findByPk(body.id);

      expect(statusCode).toEqual(201);
      expect(body.name).toEqual(checkProduct.name);
      expect(body.id).toEqual(checkProduct.id);
      expect(body.image).toEqual(checkProduct.image);
      expect(body.categoryId).toEqual(checkProduct.categoryId);
    });

  });

  afterAll(async () => {
    await downSeed();
    server.close()
  });

});
