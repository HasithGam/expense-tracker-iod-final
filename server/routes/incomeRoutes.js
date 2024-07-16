const express = require('express');
const router = express.Router();
let Controllers = require("../controllers");

// Define your routes here
router.get('/', (req, res) => {
    Controllers.Incomes.getIncome(res);
})
router.get('/:id', (req, res) => {
    Controllers.Incomes.getIncomeById(req, res);
})
router.post('/add', (req, res) => {
    Controllers.Incomes.addIncome(req.body, res);
});
router.put('/:id', (req, res) => {
    Controllers.Incomes.updateIncome(req, res);
})
router.delete('/:id', (req, res) => {
    Controllers.Incomes.deleteIncome(req, res);
})

module.exports = router;