const express = require('express');
const router = express.Router();
const incomeExpenseController = require('../controllers');

router.get('/data',
    incomeExpenseController.IncomeAndExpense.getIncomeAndExpense
);

module.exports = router;