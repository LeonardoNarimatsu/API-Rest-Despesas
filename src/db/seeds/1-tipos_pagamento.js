const db = require("..");

const runSeed = async () => {
  // VERIFICA SE A TABELA ESTA VAZIA
  const [hasData] = await db.connection.execute('select id from tipos_pagamento limit 1;');
  const id = hasData[0]?.id;
  if(id) return;
  
  const tipoPagamentos = ["Dinheiro", "Débito", "Crédito", "Pix"];
  
  // EXECUTA A QUERY DE INSERÇÃO NA TABELA DE TIPOS DE PAGAMENTOS
  const inserts = tipoPagamentos.map(async tipo => {
    await db.connection.execute('insert into tipos_pagamento (tipo) values (?);', [tipo]);
  });

  await Promise.all(inserts);
};

module.exports = { runSeed };
