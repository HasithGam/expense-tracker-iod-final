"use strict";
const expensesModel = require("../models/expenseModel");

const getExpense = (res) => {
    //Find all Expenses
    expensesModel.find({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const addExpense = (data, res) => {
    // Add Expenses to mongo DB database
    console.log(data);
    new expensesModel(data).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const updateExpense = (req, res) => {
    // updates the Expenses matching the ID from the param using JSON data POSTed in request body
    expensesModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const deleteExpense = (req, res) => {
    // deletes the Expenses matching the ID from the param
    expensesModel.findByIdAndDelete(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
};


module.exports = { getExpense, addExpense, updateExpense, deleteExpense };

