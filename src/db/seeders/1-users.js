const bcrypt = require('bcrypt');

// Importamos el modelo p/no cometer errores
const { USER_TABLE } = require("../models/user.model");

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    const encriptedPassword = await bcrypt.hash('Berenjena123', 10);
    const newUser = {
      email: 'usuarioRandom@gmail.com',
      password: encriptedPassword,
      role: 'admin',
      created_at: new Date(),
    };
    return queryInterface.bulkInsert(USER_TABLE, [newUser]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
