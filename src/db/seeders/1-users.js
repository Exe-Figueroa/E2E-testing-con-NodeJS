const bcrypt = require('bcrypt');

// Importamos el modelo p/no cometer errores
const { USER_TABLE } = require("../models/user.model");

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    const userList = [
      {
        email: 'usuarioRandom@gmail.com',
        password: await bcrypt.hash('Berenjena123', 10),
        role: 'admin',
        created_at: new Date(),
      },
      {
        email: 'customerUser@gmail.com',
        password: await bcrypt.hash('Milanesa123', 10),
        role: 'customer',
        created_at: new Date(),
      },
    ];
    return queryInterface.bulkInsert(USER_TABLE, [...userList]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
