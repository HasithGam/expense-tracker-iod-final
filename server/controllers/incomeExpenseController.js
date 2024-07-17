const mongoose = require('mongoose');
const Income = require("../models/incomeModel");
const Expense = require("../models/expenseModel");

const getIncomeAndExpense = async (req, res) => {
    try {

        const [income, expense] = await Promise.all([
            Income.find({}).exec(),
            Expense.find({}).exec()
        ]);

        res.json({ income, expense });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getIncomeAndExpense };
