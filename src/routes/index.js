const { Router } = require('express');
const despesaRouter = require('./despesa');

const router = Router();

// FUNÇÃO QUE ADICIONA /DESPESAS AO LOCALHOST
router.use('/despesas', despesaRouter);

module.exports = router;