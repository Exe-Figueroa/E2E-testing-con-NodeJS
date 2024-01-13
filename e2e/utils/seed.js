const bcrypt = require('bcrypt');

const sequelize = require('../../src/db/sequelize');
const { models } = sequelize;

const upSeed = async () => {
  try {
    // Creamos la estructura de la db
    await sequelize.sync({ force: true });
    const password = 'Berenjena123';
    const encriptedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email: 'usuarioRandom@gmail.com',
      password: encriptedPassword,
      role: 'admin'
    };
    //Creamos el usuario
    await models.User.create(newUser);

    const categoryList = [
      {
        name: 'Category 1',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
      },
      {
        name: 'Category 2',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
      },
      {
        name: 'Category 3',
        image: 'https://www.shutterstock.com/image-vector/homer-simpson-cartoon-character-isolated-260nw-2317190887.jpg',
      },
    ]
    // Enviamos información en masa
    await models.Category.bulkCreate(categoryList);
  } catch (error) {
    console.error(error);
  }
}

const downSeed = async () => {
  // Eliminamos la db
  await sequelize.drop();

}

module.exports = { upSeed, downSeed };
