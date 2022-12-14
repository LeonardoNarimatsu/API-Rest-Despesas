const { Router } = require("express");
const { DespesaService } = require("../services/despesa");

const router = Router({ mergeParams: true });
const despesaService = new DespesaService();

// CHAMDA DO SERVICE POST
router.post("/", async (req, res) => {
  const data = await despesaService.createDespesa(req.body);
  return res.status(201).json({ data, success: true });
});

// CHAMADA DO SERVICE GET
router.get("/", async (req, res) => {
  const data = await despesaService.getDespesas(req.body);
  return res.status(200).json({data, sucess: true});
});

// CHAMADA DO SERVICE GET BASEADO EM ID
router.get("/:despesa_id", async (req, res) => {
  const {despesa_id} = req.params
  const data = await despesaService.getDespesabyId(despesa_id);
  return res.status(200).json({data, sucess: true});
});

// CHAMADA DO SERVICE DELETE
router.delete("/:despesa_id", async (req, res) => {
  const {despesa_id} = req.params
  const data = await despesaService.deleteDespesa(despesa_id);  
  return res.status(202).json({ data, sucess: true });
});

module.exports = router;
