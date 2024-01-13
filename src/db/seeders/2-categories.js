const { CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  up: async (queryInterface) => {
    const categoryList = [
      {
        name: 'Category 1',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Category 2',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      },
      {
        name: 'Category 3',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
        created_at: new Date()
      }
    ];
    return queryInterface.bulkInsert(CATEGORY_TABLE, [...categoryList]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  }
};
