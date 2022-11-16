// Arquivo de configurações do banco de dados
const mysql2 = require("mysql2/promise");
const { migrate } = require("./migrations");
const { seeds } = require("./seeds");

class DBConnection {
  config = undefined;
  connection = undefined;

  constructor(config) {
    this.config = config;
  }
  // CONEXÃO COM O BANCO DE DADOS
  async connect() {
    const connection = await mysql2.createConnection(this.config);
    console.log("Conectou no MySQL");
    this.connection = connection;
    return connection;
  }
  // EXECUÇÃO DAS MIGRATIONS
  async runMingrations() {
    console.log('Running migrations...');
    return migrate();
  }
  
  // EXECUÇÃO DAS SEEDS
  async runSeeds() {
    console.log('Running seeds...');
    return seeds();
  }
}

  // CONFIGURAÇÕES DO BANCO DE DADOS
const db = new DBConnection({
  host: "localhost",
  user: "root",
  password: "2036205",
  database: "api_rest",
});

module.exports = db;
