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

    const [queryTipoPagamento] = await db.connection.execute(
      "select id from tipos_pagamento where tipo = ?;",
      [tipo_pagamento]
    );
    const tipo_pagamento_id = queryTipoPagamento[0].id;
    const [queryCategoria] = await db.connection.execute(
      "select id from categorias where nome = ?;",
      [categoria_pagamento]
    );
    const categoria_id = queryCategoria[0].id;
    const [queryDespesa] = await db.connection.execute(
      "insert into despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id) values (?, ?, ?, ?, ?);",
      [valor, data_compra, descricao, tipo_pagamento_id, categoria_id]
    );
    const despesa_id = queryDespesa.insertId;
    return despesa_id;
  }

  async getDespesas(){
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayDate = firstDay.toISOString();

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const lastDayDate = lastDay.toISOString();

    const [querygetdespesas] = await db.connection.execute(
      "select * from despesas where data_compra between ? and ? order by data_compra ;",
      [firstDayDate, lastDayDate]
    );
    const despesas = querygetdespesas;
    return despesas;
  }

  async getDespesabyId(id){
    const [querygetDespesasId] = await db.connection.execute(
      "select * from despesas where id = ?;",
      [id]
    );
    const despesas = querygetDespesasId[0];
    return despesas;
  }

  async deleteDespesa(id){
    await db.connection.execute(
      "delete from despesas where id = ?;",
      [id]
    );

    return {result: "deleted"};  
  }
}

module.exports = { DespesaService };