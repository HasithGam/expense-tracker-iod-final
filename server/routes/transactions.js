const express = require('express');
const router = express.Router();
let Controllers = require("../controllers");

// Define your routes here
router.get('/income', (req, res) => {
    controllers.Incomes.getIncome(res);
})
router.post('/add-income', (req, res) => {
    Controllers.Incomes.addIncome(req.body, res);
});
router.put('/update/:id', (req, res) => {
    Controllers.Incomes.updateIncome(req, res);
})
router.delete('/delete/:id', (req, res) => {
    Controllers.Incomes.deleteIncome(req, res);
})

module.exports = router;




// const { addIncome } = require('../controllers/income');

// const router = require('express').Router();

// // router.get('/', (req, res) => {
// //     res.send('Hellloooooo')
// // });

// router.post('/add-income', addIncome);

// module.exports = router;