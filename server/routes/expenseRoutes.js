const express = require('express');
const router = express.Router();
let Controllers = require("../controllers");

// Define your routes here
router.get('/', (req, res) => {
    Controllers.Expenses.getExpense(res);
})
router.post('/add', (req, res) => {
    Controllers.Expenses.addExpense(req.body, res);
});
router.put('/:id', (req, res) => {
    Controllers.Expenses.updateExpense(req, res);
})
router.delete('/:id', (req, res) => {
    Controllers.Expenses.deleteExpense(req, res);
})

module.exports = router;