const db = require("..");

const runMigration = async () => {
  await db.connection.execute(
    `CREATE TABLE IF NOT EXISTS categorias (
      id int NOT NULL AUTO_INCREMENT,
      nome varchar(45) DEFAULT NULL,
      descricao varchar(45) DEFAULT NULL,
      PRIMARY KEY (id)
    );`
  );
};

module.exports = { runMigration };
