const db = require("..");

const runSeed = async () => {
  const [hasData] = await db.connection.execute('select id from categorias limit 1;');
  const id = hasData[0]?.id;
  if(id) return;

  const categorias = [
    {
      nome: 'boleto',
      descricao: 'compras pagas no boleto'
    },
    {
      nome: 'fatura',
      descricao: 'pagamentos de faturas'
    }
  ];

  const inserts = categorias.map(async ({ nome, descricao }) => {
    await db.connection.execute('insert into categorias (nome, descricao) values (?, ?);', [nome, descricao]);
  });

  await Promise.all(inserts);
};

module.exports = { runSeed };
