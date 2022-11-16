const db = require("..");

class DespesaService {
  async createDespesa(despesa) {
    const {
      valor,
      data_compra,
      descricao,
      tipo_pagamento,
      categoria_pagamento,
    } = despesa;

    // PEGA ID DO TIPO DE PAGAMENTO
    const [queryTipoPagamento] = await db.connection.execute(
      "select id from tipos_pagamento where tipo = ?;",
      [tipo_pagamento]
    );
    const tipo_pagamento_id = queryTipoPagamento[0].id;

    // PEGA ID DA CATEGORIA
    const [queryCategoria] = await db.connection.execute(
      "select id from categorias where nome = ?;",
      [categoria_pagamento]
    );
    const categoria_id = queryCategoria[0].id;

    // INSERÇÃO NA TEBELA DESPESAS
    const [queryDespesa] = await db.connection.execute(
      "insert into despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id) values (?, ?, ?, ?, ?);",
      [valor, data_compra, descricao, tipo_pagamento_id, categoria_id]
    );
    const despesa_id = queryDespesa.insertId;
    return despesa_id;
  }

  async getDespesas(){
    // PEGA O PRIMEIRO DIA DO MÊS ATUAL
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayDate = firstDay.toISOString();

    // PEGA O ULTIMO DIA DO MÊS ATUAL
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDayDate = lastDay.toISOString();

    // SELECT NA TABELA DESPESAS ORDENADO PELO MÊS ATUAL
    const [querygetdespesas] = await db.connection.execute(
      "select * from despesas where data_compra between ? and ? order by data_compra ;",
      [firstDayDate, lastDayDate]
    );
    const despesas = querygetdespesas;
    return despesas;
  }

  // SELECT NA TABELA DESPESAS BASEADA EM UMA ID
  async getDespesabyId(id){
    const [querygetDespesasId] = await db.connection.execute(
      "select * from despesas where id = ?;",
      [id]
    );
    const despesas = querygetDespesasId[0];
    return despesas;
  }

  // REALIZA DELETE NA TABELA DESPESAS
  async deleteDespesa(id){
    await db.connection.execute(
      "delete from despesas where id = ?;",
      [id]
    );

    return {result: "deleted"};  
  }
}

module.exports = { DespesaService };