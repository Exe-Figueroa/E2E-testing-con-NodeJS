const sequelize = require('../../src/db/sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const umzug = new Umzug({
  migrations: {glob: './src/db/seeders/*.js'},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({sequelize}),
  logger: undefined,
});
const upSeed = async () => {
  try {
    // Le decimos que se pueda sincronizar
    await sequelize.sync({force:true});
    // Le decimos a umzug que corra las migraciones
    await umzug.up();
  } catch (error) {
    console.error(error);
  }
}

const downSeed = async () => {
  // Eliminamos la db y por ende nos ahorramos el umzug.down
  await sequelize.drop();

}

module.exports = { upSeed, downSeed };
