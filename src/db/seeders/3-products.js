const { PRODUCT_TABLE } = require("../models/product.model");


module.exports = {
  up: async (queryInterface) => {
    const productList = [
      {
        name: 'Product 1',
        price: 500,
        description: 'Product 1 description',
        category_id : 1,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 2',
        price: 500,
        description: 'Product 2 description',
        category_id : 1,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 3',
        price: 500,
        description: 'Product 3 description',
        category_id : 1,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 4',
        price: 500,
        description: 'Product 4 description',
        category_id : 2,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 5',
        price: 500,
        description: 'Product 5 description',
        category_id : 2,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 6',
        price: 500,
        description: 'Product 6 description',
        category_id : 2,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 7',
        price: 500,
        description: 'Product 7 description',
        category_id : 2,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 8',
        price: 500,
        description: 'Product 8 description',
        category_id : 1,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Product 9',
        price: 500,
        description: 'Product 9 description',
        category_id : 2,
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
    ];
    return queryInterface.bulkInsert(PRODUCT_TABLE, [...productList]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  }
};
