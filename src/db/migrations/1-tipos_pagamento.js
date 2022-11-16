const db = require("..");

// QUERY DE CRIAÇÃO DE TABELA TIPOS_PAGAMENTO
  const runMigration = async () => {
    await db.connection.execute(
    `CREATE TABLE IF NOT EXISTS tipos_pagamento (
      id int NOT NULL AUTO_INCREMENT,
      tipo varchar(45) DEFAULT NULL,
      PRIMARY KEY (id)
    );`
  );
};

module.exports = { runMigration };
