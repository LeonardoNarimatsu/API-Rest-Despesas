const db = require("..");

// QUERY DE CRIAÇÃO DE TABELA DESPESAS
const runMigration = async () => {
  await db.connection.execute(
    `CREATE TABLE IF NOT EXISTS despesas(
        id int NOT NULL AUTO_INCREMENT,
        valor double DEFAULT NULL,
        data_compra datetime DEFAULT NULL,
        descricao varchar(45) DEFAULT NULL,
        tipo_pagamento_id int DEFAULT NULL,
        categoria_id int DEFAULT NULL,
        PRIMARY KEY (id)
      );`
  );
};

module.exports = { runMigration };
