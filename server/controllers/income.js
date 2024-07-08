"use strict";
const Models = require("../models");

const getIncome = (res) => {
    //Find all income
    Models.IncomeModel.find({})
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const addIncome = (data, res) => {
    // Add income to mongo DB database
    console.log(data);
    new Models.IncomeModel(data).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

const updateIncome = (req, res) => {
    // updates the Income matching the ID from the param using JSON data POSTed in request body
    Models.IncomeModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const deleteIncome = (req, res) => {
    // deletes the user matching the ID from the param
    Models.IncomeModel.findByIdAndDelete(req.params.id)
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
};


module.exports = { getIncome, addIncome, updateIncome, deleteIncome };









// exports.addIncome = async (req, res) => {
//     // console.log(req.body);
//     const { title, amount, category, description, date } = req.body

//     const income = IncomeSchema({
//         title, amount, category, description, date
//     })
//     try{

//     }
//     catch(error){

//     }
// }