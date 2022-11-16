const { Router } = require('express');
const despesaRouter = require('./despesa');

const router = Router();

router.use('/despesas', despesaRouter);

module.exports = router;