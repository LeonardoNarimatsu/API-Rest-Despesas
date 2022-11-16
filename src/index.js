const express = require("express");
const db = require("./db");
const modulesRouter = require("./routes");

const PORT = 3000;

//INICIO DA APLICAÇÃO
async function main(){
  const app = express();
  app.use(express.json());

  //CHAMANDO FUNÇÃO CONNECT
  await db.connect();

  //CHAMANDO FUNÇÃO MIGRATIONS (CRIAÇÃO DO BANCO E TEBELAS)
  await db.runMingrations();

  //CHAMANDO FUNÇÃO SEEDS ( POVOAR TABELAS DE TIPO DE PAGAMENTO E CATEGORIA)
  await db.runSeeds();

  //CHAMA FUNÇÃO API
  app.use('/api', modulesRouter);

  //MANDAR O SERVIDOR RODAR
  app.listen(PORT, () => console.log(`server is running in port \x1b[35m${PORT}\x1b[0m`));  
}

main();



