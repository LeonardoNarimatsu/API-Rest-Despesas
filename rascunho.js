const express = require("express");
const mysql2 = require("mysql2/promise")

let despesa = [];

//INICIO DA APLICAÇÃO
const app = express();

// CONEXÃO COM BANCO DE DADOS MYSQL
const connectDb = async () => {
    const connection = await mysql2.createConnection({
        host : 'localhost',
        user : 'root',
        password : '2036205',
        database : 'api_rest'
    });
    console.log('Conectou no MySQL');
    return connection;
}

connectDb().then((conn) => {
    app.use(express.json());

// ROUTES POST/ GET/ GET ID / DELETE
    app.post("/api/despesas", async (req, res) =>  {
        const { valor, data_compra, descricao, tipo_pagamento, categoria_pagamento} = req.body;
     
        const [queryTipoPagamento] = await conn.execute('select id from tipos_pagamento where tipo = ?;', [            
            tipo_pagamento
        ]);
        const tipo_pagamento_id = queryTipoPagamento[0].id;
        const [queryCategoria] = await conn.execute('select id from categorias where nome = ?;', [
            categoria_pagamento
        ]);
        const categoria_id = queryCategoria[0].id
        const [queryDespesa] = await conn.execute("insert into despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id) values (?, ?, ?, ?, ?);",[
            valor, data_compra, descricao, tipo_pagamento_id, categoria_id
        ]);        

        return res.status(201).json({
            data: queryDespesa.insertId,
            sucess: true
        });         
      
    });

    app.get("/api/despesas", async (req, res) => {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstDayDate = firstDay.toISOString()        
        
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const lastDayDate = lastDay.toISOString()
  
        const [despesas] = await conn.execute("select * from despesas where data_compra between ? and ? order by data_compra ;",[
            firstDayDate, lastDayDate
        ]);
        return res.status(200).json(despesas);
    })
    
    app.get("/api/despesas/:despesas_id", async (req, res) => {
        const { despesas_id } = req.params;
        const [despesas] = await conn.execute("select * from despesas where id = ?;", [despesas_id]);
        const despesa = despesas[0];
        if (!despesa) res.status(404).json("not found");
        return res.status(200).json(despesa);
    })

    app.delete("/api/despesas/:despesas_id", async (req, res) => {
        const { despesas_id } = req.params;
        await conn.execute("delete from despesas where id = ?;", [despesas_id]);
        return res.status(204).json({ result: "deleted" });
    });

    //MANDAR O SERVIDOR RODAR
    app.listen(3333, () => console.log('server is running'));
});


