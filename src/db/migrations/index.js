const fs = require("fs/promises");

const migrate = async () => {
    // RETIRA O INDEX PELO FILTER
  let migrations = await fs.readdir('./src/db/migrations');
  migrations = migrations.filter(i => i !== 'index.js');

  const runners = migrations.map(async migration => {
    //EXECUTA A FUNÇÃO SEED
    const { runMigration } = require(`./${migration}`);
    await runMigration();
    console.log(migration, '\x1b[32mDONE!\x1b[0m')
  });

  await Promise.all(runners);
};

module.exports = { migrate };